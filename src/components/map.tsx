import { Dispatch, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

type PlaceType = {
  place_id: number;
  osm_id: number;
  osm_type: string;
  type: string;
  extratags?: {
    level?: string;
    phone?: string;
    indoor?: string;
    cuisine?: string;
    website?: string;
  };
  boundingbox: number[];
  lat: number;
  lon: number;
  display_name: string;
  address: {
    amenity: string;
    road: string;
    suburb: string;
    city_district: string;
    town: string;
    county: string;
    state: string;
    "ISO3166-2-lvl4": string;
    postcode: string;
    country: string;
    country_code: string;
  };
};

const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});

const Bound = ({
  results,
  isReset,
}: {
  results: PlaceType[];
  isReset: boolean;
}) => {
  const [bounds, setBounds] = useState(null);
  const map = useMap();
  useEffect(() => {
    if (results.length > 0) {
      let bbox = results.reduce((tot, cur) => {
        if (!tot) {
          return cur.boundingbox;
        }
        const [t1, t2, t3, t4] = tot;
        const [c1, c2, c3, c4] = cur.boundingbox;

        return [
          Math.min(t1, c1),
          Math.max(t2, c2),
          Math.min(t3, c3),
          Math.max(t4, c4),
        ];
      }, undefined);

      const [l1, u1, l2, u2] = bbox;
      setBounds([
        [l1, l2],
        [u1, u2],
      ]);

      map.flyToBounds(
        [
          [l1, l2],
          [u1, u2],
        ],
        { padding: [15, 15], duration: 1.5, maxZoom: 15 }
      );
    }
  }, [results]);

  useEffect(() => {
    if (bounds && isReset)
      map.flyToBounds(bounds, {
        padding: [15, 15],
        duration: 1.5,
        maxZoom: 15,
      });
  }, [isReset]);

  console.log(bounds);

  return null;
};

const PlaceButton = ({
  place,
  setSelected,
  isEnabled,
  resetSelected,
}: {
  place: PlaceType;
  setSelected: () => void;
  isEnabled: boolean;
  resetSelected: () => void;
}) => {
  const { address } = place;

  const { amenity } = address;

  return (
    <button
      className={`m-1 w-[40%] rounded p-1 outline outline-slate-500 hover:bg-slate-500 ${
        isEnabled ? "bg-slate-500" : ""
      }`}
      onClick={() => {
        isEnabled ? resetSelected() : setSelected();
      }}
    >
      <span className="flex font-semibold">{amenity}</span>
      {/* {"type: " + JSON.stringify(type)} <br />
              {"category: " + JSON.stringify(category)} <br />
              {extratags.cuisine} */}
      {/* {"extratags: " + JSON.stringify(extratags)} <br /> */}
      {/* <button className="text-md outline"></button> */}
    </button>
  );
};

const PopupTriggerableMarker = ({
  place,
}: {
  place: PlaceType & { isPopupOpen: boolean };
}) => {
  const markerRef = useRef<typeof Marker>(null);
  const map = useMap();

  const {
    address,
    display_name,
    lat,
    lon,
    osm_id,
    osm_type,
    place_id,
    type,
    extratags,
    isPopupOpen,
  } = place;

  useEffect(() => {
    if (isPopupOpen) {
      map.flyTo([lat, lon], 8, { duration: 1 });
      // markerRef.current.openPopup();
    }
  }, [isPopupOpen]);

  return (
    <Marker position={[Number(lat), Number(lon)]} icon={icon} ref={markerRef}>
      <Popup>
        <button className="outline">asd</button>
        <div className="text-md">
          {"address.amenity: " + JSON.stringify(address?.amenity)} <br />
          {"osm_id: " + JSON.stringify(osm_id)} <br />
          {"osm_type: " + JSON.stringify(osm_type)} <br />
          {"place_id: " + JSON.stringify(place_id)} <br />
          {"type: " + JSON.stringify(type)} <br />
          {"isPopupOpen: " + isPopupOpen} <br />
        </div>
      </Popup>
    </Marker>
  );
};

const SearchComp = ({ setResults }: { setResults: Dispatch<PlaceType[]> }) => {
  const OSM_URL = "https://nominatim.openstreetmap.org/search.php?";
  const [search, setSearch] = useState("");

  const searchHandler = () => {
    const params = {
      q: search,
      addressdetails: "1",
      extratags: "1",
      countrycodes: "ca",
      limit: "20",
      //   x1,y1, x2,y2
      // viewbox: [-123, 45, -123 + 2, 45 + 2],
      // bounded: "1",
      format: "jsonv2",
    };
    const queryString = new URLSearchParams(params).toString();
    // console.log(`${OSM_URL}${queryString}`);

    fetch(`${OSM_URL}${queryString}`, {
      method: "GET",
      redirect: "follow",
    })
      .then((res) => res.text())
      .then((r) => {
        // console.log(JSON.parse(r));

        setResults(JSON.parse(r));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="m-2 flex items-center overflow-hidden rounded-sm text-center align-middle outline outline-slate-500">
      <input
        type="text"
        placeholder="search bistro"
        className="mx-1 w-32"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        className="px-2 text-lg font-semibold outline outline-slate-500"
        onClick={searchHandler}
      >
        search
      </button>
    </div>
  );
};

const Map = () => {
  const [results, setResults] = useState<PlaceType[]>([]);

  const [selectedIndex, setSelectedIndex] = useState<number>();
  console.log(selectedIndex);

  const currySelect = (i: number) => {
    return () => setSelectedIndex(i);
  };
  const resetSelect = () => {
    setSelectedIndex(undefined);
  };

  return (
    <div className="flex flex-col place-items-center">
      <SearchComp setResults={setResults} />
      <MapContainer
        center={[45, -123]}
        zoom={3}
        worldCopyJump
        className="aspect-[4/3] w-[90%] rounded-md md:max-w-xl"
        maxZoom={18}
        minZoom={3}
        maxBounds={[
          [-180, -360],
          [180, 360],
        ]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
        />

        {results.map((r: PlaceType, i) => {
          return (
            <PopupTriggerableMarker
              key={i}
              place={{ ...r, isPopupOpen: i === selectedIndex }}
            />
          );
        })}
        <Bound results={results} isReset={selectedIndex === undefined} />
      </MapContainer>

      <div className="flex max-w-[90%] flex-wrap justify-center md:max-w-md ">
        {results.map((r, i) => {
          return (
            <PlaceButton
              key={i}
              place={{
                ...r,
              }}
              setSelected={currySelect(i)}
              isEnabled={selectedIndex === i}
              resetSelected={() => setSelectedIndex(undefined)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Map;

//     OSM type && id defines a useful enough identifier
//   {"osm_id: " + JSON.stringify(osm_id)} <br />
//   {"osm_type: " + JSON.stringify(osm_type)} <br />
//   {"place_id: " + JSON.stringify(r.place_id)} <br />

//   {"display_name: " + JSON.stringify(display_name)} <br />
//   address

//   address,
//   display_name,
//   lat,
//   lon,
//   osm_id,
//   osm_type,
//   place_id,
//   type,

//  later for user location based nearby places
//  <Marker position={[49.5, -122.5]} icon={icon}></Marker>
//  <Marker position={[49, -123.5]} icon={icon} />;

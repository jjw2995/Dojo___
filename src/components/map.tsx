import { Dispatch, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FitBoundsOptions } from "leaflet";
import { LatLngBoundsLiteral } from "leaflet";

export type PlaceType = {
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
    opening_hours?: string;
  };
  boundingbox: number[];
  lat: number;
  lon: number;
  display_name: string;
  address: {
    amenity: string;
    house_number: string;
    road: string;
    suburb: string;
    city: string;
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
  const [bounds, setBounds] = useState<LatLngBoundsLiteral>();

  const map = useMap();
  const opts: FitBoundsOptions = {
    padding: [5, 5],
    duration: 1.5,
    maxZoom: 12,
  };

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
      const xy1xy2: LatLngBoundsLiteral = [
        [l1, l2],
        [u1, u2],
      ];
      setBounds(xy1xy2);
      map.flyToBounds(xy1xy2, opts);
    }
  }, [results]);

  useEffect(() => {
    if (bounds && isReset) {
      map.flyToBounds(bounds, opts);
      map.closePopup();
    }
  }, [isReset]);

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
  const { address, display_name } = place;

  const { amenity, country, road, state, house_number, city, postcode } =
    address;
  // console.log(display_name.split(", ").slice(1).join(", "));
  // console.log(address);

  return (
    <button
      className={`m-1 w-64 rounded p-1 text-xs font-light outline outline-slate-500 ${
        isEnabled ? "bg-slate-300" : ""
      }`}
      onClick={() => {
        isEnabled ? resetSelected() : setSelected();
      }}
    >
      <span className="text-sm font-bold text-slate-600">{amenity}</span>
      <div>{[house_number, road, city, "\n"].filter((v) => v).join(", ")}</div>
      <div>{[state, country, postcode].filter((v) => v).join(", ")}</div>
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

  const { lat, lon, isPopupOpen, display_name } = place;

  useEffect(() => {
    if (isPopupOpen) {
      map.flyTo([lat, lon], 14, { duration: 1.5 });
      // markerRef.current.openPopup();
    }
  }, [isPopupOpen]);

  return (
    <Marker position={[Number(lat), Number(lon)]} icon={icon} ref={markerRef}>
      <Popup>
        <div className="text-md">{display_name}</div>
      </Popup>
    </Marker>
  );
};

const SearchComp = ({ setResults }: { setResults: Dispatch<PlaceType[]> }) => {
  const OSM_URL = "https://nominatim.openstreetmap.org/search.php?";
  const [search, setSearch] = useState("");
  const btnRef = useRef<HTMLButtonElement>(null);

  const searchHandler = () => {
    const params = {
      q: search,
      addressdetails: "1",
      // extratags: "1",
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
        onKeyDown={(e) => {
          // e.key
          if (e.key === "Enter") {
            e.preventDefault;
            btnRef.current?.click();
          }
        }}
      />
      <button
        className="px-2 text-lg font-semibold outline outline-slate-500 active:bg-slate-400"
        onClick={searchHandler}
        ref={btnRef}
      >
        search
      </button>
    </div>
  );
};

const Map = ({ setPlace }: { setPlace: Dispatch<PlaceType | undefined> }) => {
  const [results, setResults] = useState<PlaceType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const currySelect = (i: number) => {
    return () => setSelectedIndex(i);
  };
  const resetSelect = () => {
    setSelectedIndex(undefined);
  };

  useEffect(() => {
    resetSelect();
  }, [results]);

  useEffect(() => {
    if (selectedIndex) {
      setPlace(results[selectedIndex]);
    } else {
      setPlace(undefined);
    }
  }, [selectedIndex]);

  return (
    <div className="flex flex-col place-items-center  ">
      <SearchComp setResults={setResults} />
      <div className="w-[90%] md:max-w-xl">
        <MapContainer
          center={[45, -123]}
          zoom={3}
          worldCopyJump
          className="aspect-[4/3] rounded"
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
      </div>
      <div className="flex max-w-xl flex-wrap justify-center ">
        {results.map((r, i) => {
          return (
            <PlaceButton
              key={i}
              place={{
                ...r,
              }}
              setSelected={currySelect(i)}
              isEnabled={selectedIndex === i}
              resetSelected={resetSelect}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Map;

//  later for user location based nearby places
//  <Marker position={[49.5, -122.5]} icon={icon}></Marker>
//  <Marker position={[49, -123.5]} icon={icon} />;

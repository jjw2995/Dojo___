import {
  Dispatch,
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FitBoundsOptions } from "leaflet";
import { LatLngBoundsLiteral } from "leaflet";
import { getNameLocReg } from "~/utils/name";

export type Place = {
  place_id: number;
  osm_id: string;
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
  boundingbox: [number, number, number, number];
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
  results: Place[] | undefined;
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
    if (results && results.length > 0) {
      let bbox: [number, number, number, number] | undefined;
      results.forEach((v) => {
        if (!bbox) {
          bbox = v.boundingbox;
        } else {
          const [v1, v2, v3, v4] = v.boundingbox;
          const [b1, b2, b3, b4] = bbox;
          bbox = [
            Math.min(v1, b1),
            Math.max(v2, b2),
            Math.min(v3, b3),
            Math.max(v4, b4),
          ];
        }
      });

      const [x1, x2, y1, y2] = bbox;
      const xy1xy2: LatLngBoundsLiteral = [
        [x1, y1],
        [x2, y2],
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
  className,
}: {
  place: Place;
  setSelected: () => void;
  isEnabled: boolean;
  resetSelected: () => void;
  className?: string;
}) => {
  const { name, location, region } = getNameLocReg(place);

  return (
    <div
      className={`card m-[0.125rem] w-[95%] p-[0.1em] pl-3 leading-tight shadow outline outline-1 ${
        isEnabled ? "bg-slate-300" : ""
      } ${className}`}
      onClick={() => {
        isEnabled ? resetSelected() : setSelected();
      }}
    >
      <div className=" card-body gap-0 p-0 pb-1 leading-none ">
        <div className="card-title p-[0.1em] text-base font-bold leading-none">
          {name}
          <div className="mt-1 text-xs font-thin leading-none">
            <div>{location ?? "N/A"}</div>
            <div>{region ?? "N/A"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PopupTriggerableMarker = ({
  place,
}: {
  place: Place & { isPopupOpen: boolean };
}) => {
  const markerRef = useRef(null);
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

/**
 * This component uses Nominatim(OSM) api to search location and plots on a map
 *
 */
const Map: FC<
  PropsWithChildren & {
    setPlace: Dispatch<Place | undefined>;
    places: Place[] | undefined;
  }
> = ({ setPlace, places }) => {
  // const [places, setResults] = useState<PlaceType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // console.log(places);

  const currySelect = (i: number) => {
    return () => setSelectedIndex(i);
  };
  const resetSelect = () => {
    setSelectedIndex(-1);
  };

  useEffect(() => {
    resetSelect();
  }, [places]);

  useEffect(() => {
    if (selectedIndex >= 0) {
      setPlace(places[selectedIndex]);
    } else {
      setPlace(undefined);
      resetSelect();
    }
  }, [selectedIndex]);

  const respWidth = "w-[90%] lg:max-w-xl";

  return (
    <div className="flex flex-col place-items-center">
      <div className="p-1 text-xs text-slate-400">
        replace hyphen (&quot;-&quot;) to space
      </div>
      {/* <div className={respWidth}> */}
      <MapContainer
        center={[45, -123]}
        zoom={3}
        worldCopyJump
        className="aspect-[4/3] w-[90%] rounded lg:max-w-xl"
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

        {places?.map((r: Place, i) => {
          return (
            <PopupTriggerableMarker
              key={i}
              place={{ ...r, isPopupOpen: i === selectedIndex }}
            />
          );
        })}
        <Bound results={places} isReset={selectedIndex === undefined} />
      </MapContainer>
      <div
        className={`justify-center ${respWidth} justify-content-center flex  h-24 flex-col items-center overflow-scroll overscroll-x-none first:pt-4	`}
      >
        {places?.map((r, i) => {
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

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

const PlaceItem = ({ place }: { place: PlaceType }) => {
  const { address, display_name } = place;
  const {
    amenity,
    country,
    road,
    state,
    house_number,
    county,
    city,
    postcode,
  } = address;

  return (
    <>
      <span className="text-sm font-bold text-slate-600">{amenity}</span>

      {display_name}
    </>
  );
};

export default PlaceItem;

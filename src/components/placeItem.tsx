import { PlaceType } from "./map";

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

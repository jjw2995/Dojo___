import { isType } from ".";
import { Bistro } from "@prisma/client";
import { Place } from "~/components/map";

export const getNameLocReg = (place: Place | Bistro | undefined) => {
  if (!place) {
    return { name: undefined, location: undefined, region: undefined };
  }
  //   if ((isType<Bistro>(place))

  const { amenity, city, country, house_number, road, state, suburb } = {
    ...(Object.hasOwn(place, "address")
      ? isType<Place>(place) && { ...place.address }
      : isType<Bistro>(place) && { ...place, amenity: place.name }),
  } as Bistro;

  const location = [house_number, road, suburb].filter((r) => r).join(", ");
  const region = [city, state, country].filter((r) => r).join(", ");

  return {
    name: amenity,
    location: location !== "" ? location : "n/a",
    region: region !== "" ? region : "n/a",
  };
};

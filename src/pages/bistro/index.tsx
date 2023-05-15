import Link from "next/link";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const DMap = dynamic(() => import("~/components/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

import withAuth from "~/hoc/withAuth";
import { RouterOutputs, api } from "~/utils/api";
import { LINKS } from "~/utils/links";
import { PlaceType } from "~/components/placeItem";

type bistro = RouterOutputs["bistro"]["getAllUserIsPartOf"][number];
const BistroItem = ({ bistro }: { bistro: bistro }) => {
  return (
    <>
      <div className="m-1 w-64 rounded p-1 text-xs font-light outline outline-slate-500">
        <span className="text-sm font-bold text-slate-600">{bistro.name}</span>
        {bistro.osm_display_name}
      </div>
    </>
  );
};

const MemberedBistros = () => {
  const ctx = api.useContext();

  const { data } = api.bistro.getAllUserIsPartOf.useQuery();
  const { mutate: deleteBistro } = api.bistro.delete.useMutation({
    onSuccess: () => {
      void ctx.bistro.getAllUserIsPartOf.invalidate();
    },
  });
  return (
    <div className="m-2 flex outline">
      MemberedBistros
      {data?.map((elem) => {
        return (
          <div key={elem.id} className="">
            <Link href={LINKS.withBistroId(elem.id).home}>
              <BistroItem bistro={elem} />
            </Link>
            <button
              className="m-1 h-6 w-6 items-center justify-center outline"
              onClick={() => {
                deleteBistro({ bistroId: elem.id });
              }}
            >
              x
            </button>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// ============================================================
// ============================================================

const CreateWizard = ({ place }: { place: PlaceType | undefined }) => {
  const [input, setInput] = useState("");
  const ctx = api.useContext();

  const { mutate: createBistro } = api.bistro.create.useMutation({
    onSuccess: () => {
      void ctx.bistro.getAllUserIsPartOf.invalidate();
    },
    onError: (e) => {
      alert("name already exists");
      // alert(e);
    },
  });

  useEffect(() => {
    if (place) {
      setInput(place.address.amenity);
    }
  }, [place]);

  return (
    <div className="flex flex-col items-center justify-items-center outline">
      <div>create</div>
      <div className="m-2 flex items-center overflow-hidden rounded-sm text-center align-middle outline outline-slate-500">
        <input
          placeholder="name"
          value={input}
          className="mx-1 w-32"
          onChange={(e) => {
            e.preventDefault();
            setInput(e.target.value);
          }}
        />
        <button
          className="px-2 text-lg font-semibold outline outline-slate-500 active:bg-slate-400"
          onClick={() => {
            if (!place) {
              createBistro({ name: input });
            } else {
              const { display_name, lat, lon, osm_id, osm_type } = place;

              createBistro({
                name: input,
                osm_display_name: display_name,
                osm_id,
                osm_type,
                osm_lat: lat.toString(),
                osm_lon: lon.toString(),
              });
            }
          }}
        >
          create bistro
        </button>
      </div>
      <div>
        <div>{place?.display_name}</div>
      </div>
    </div>
  );
};

const useRequestJoin = ({ bistroId }: { bistroId: string }) => {
  // const {} = api.bistro.
  return null;
};

const BistrosByName = () => {
  const [searchName, setSearchName] = useState("");
  const { data: bistros } = api.bistro.searchByName.useQuery(
    { name: searchName },
    { enabled: searchName !== "" && searchName.length > 2 }
  );

  return (
    <div className="m-2 rounded outline">
      <input
        placeholder="search name"
        value={searchName}
        className="mx-1 w-32"
        onChange={(e) => {
          e.preventDefault();
          setSearchName(e.target.value);
        }}
      />
      <span className="font-semibold text-slate-600">BistrosByName</span>
      <div>
        {bistros?.map((bistro) => {
          return (
            <div>
              <BistroItem bistro={bistro} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BistrosByPlace = ({ place }: { place: PlaceType }) => {
  const { osm_id, osm_type } = place;
  const { data: bistros } = api.bistro.searchByOSM.useQuery({
    osm_id,
    osm_type,
  });

  return (
    <div className="m-2 rounded outline">
      <span className="font-semibold text-slate-600">BistrosByPlace</span>
      <div className="text-xs">{place.display_name}</div>
      <div>
        {bistros?.map((bistro) => {
          return (
            <div>
              <BistroItem bistro={bistro} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
const Bistro = () => {
  const [place, setPlace] = useState<PlaceType | undefined>();

  return (
    <div className="flex flex-col">
      <div className="m-2 p-2 outline">
        <h1 className="text-2xl">My Bistros</h1>
        <MemberedBistros />
      </div>
      <div className="m-2 p-2 outline">
        <h1 className="text-2xl">Search & Create</h1>

        <CreateWizard place={place} />
        {/* {place && <BistrosByPlace place={place} />} */}
        <BistrosByName />
        <BistrosByPlace
          place={{
            place_id: 7043391,
            licence:
              "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
            osm_type: "node",
            osm_id: 889758799,
            boundingbox: [
              "49.2679878",
              "49.2680878",
              "-123.1569784",
              "-123.1568784",
            ],
            lat: "49.2680378",
            lon: "-123.1569284",
            display_name:
              "Hi Nippon, 2274, West 4th Avenue, Kitsilano, Vancouver, Metro Vancouver Regional District, British Columbia, V6K, Canada",
            place_rank: 30,
            category: "amenity",
            type: "restaurant",
            importance: 0.2001,
            icon: "https://nominatim.openstreetmap.org/ui/mapicons/food_restaurant.p.20.png",
            address: {
              amenity: "Hi Nippon",
              house_number: "2274",
              road: "West 4th Avenue",
              suburb: "Kitsilano",
              city: "Vancouver",
              county: "Metro Vancouver Regional District",
              state: "British Columbia",
              "ISO3166-2-lvl4": "CA-BC",
              postcode: "V6K",
              country: "Canada",
              country_code: "ca",
            },
            extratags: {
              cuisine: "japanese",
              opening_hours:
                "Mo-Th 11:30-21:30; Fr-Sa 11:30-22:00; Su 11:30-21:30",
            },
          }}
        />
      </div>
      <DMap setPlace={setPlace} />
    </div>
  );
};

export default withAuth(Bistro);

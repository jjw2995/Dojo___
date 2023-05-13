import Link from "next/link";
import { useState } from "react";
// import Map from "~/components/map";
import dynamic from "next/dynamic";

const DMap = dynamic(() => import("~/components/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

import withAuth from "~/hoc/withAuth";
import { RouterOutputs, api } from "~/utils/api";
import { PlaceType } from "~/components/map";

const CreateWizard = () => {
  const [input, setInput] = useState("");
  const ctx = api.useContext();

  const { mutate: createBistro } = api.bistro.create.useMutation({
    onSuccess: () => {
      void ctx.bistro.getAllUserIsPartOf.invalidate();
    },
  });

  return (
    <>
      <input
        className="outline"
        onChange={(e) => {
          e.preventDefault();
          setInput(e.target.value);
        }}
      />
      <button onClick={() => createBistro({ name: input })}>
        create bistro
      </button>
    </>
  );
};

type bistro = RouterOutputs["bistro"]["getAllUserIsPartOf"][number];
const BistroItem = ({ bistro }: { bistro: bistro }) => {
  return (
    <ul className="m-1 rounded-sm outline">
      <li>{bistro.name}</li>
      <li>{bistro.id}</li>
    </ul>
  );
};
const Bistro = () => {
  const { data } = api.bistro.getAllUserIsPartOf.useQuery();
  const [place, setPlace] = useState<PlaceType | undefined>();
  const ctx = api.useContext();

  const { mutate: deleteBistro } = api.bistro.delete.useMutation({
    onSuccess: () => {
      void ctx.bistro.getAllUserIsPartOf.invalidate();
    },
  });
  console.log(place);

  return (
    <div className="flex flex-col">
      <div className=" ">
        <h1 className="text-2xl">Bistro</h1>
        <CreateWizard />

        <div className="flex">
          {data?.map((elem) => {
            return (
              <div key={elem.id} className="">
                <Link href={`/bistro/${elem.id}/home`}>
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
      </div>
      <DMap setPlace={setPlace} />
    </div>
  );
};

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

export default withAuth(Bistro);

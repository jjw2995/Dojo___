import Link from "next/link";
import { useState } from "react";

import withAuth from "~/hoc/withAuth";
import { RouterOutputs, api } from "~/utils/api";

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
      <div></div>
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
  const ctx = api.useContext();

  const { mutate: deleteBistro } = api.bistro.delete.useMutation({
    onSuccess: () => {
      void ctx.bistro.getAllUserIsPartOf.invalidate();
    },
  });

  return (
    <div>
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
  );
};

export default withAuth(Bistro);

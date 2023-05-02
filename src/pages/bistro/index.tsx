import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import withAuth from "~/hoc/withAuth";
import { RouterOutputs, api } from "~/utils/api";

const CreateWizard = ({ ctx }) => {
  const [input, setInput] = useState("");
  const {
    mutate: createBistro,
    isError: createError,
    error,
  } = api.bistro.create.useMutation({
    onSuccess: () => {
      ctx.bistro.getAll.invalidate();
    },
  });

  return (
    <>
      <Input
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

type bistro = RouterOutputs["bistro"]["getAll"][number];
const BistroItem = ({ bistro }: { bistro: bistro }) => {
  return (
    <ul className="m-1 rounded-sm outline">
      <li>{bistro.name}</li>
      <li>{bistro.id}</li>
    </ul>
  );
};
const Bistro = () => {
  const { data } = api.bistro.getAll.useQuery();
  const ctx = api.useContext();
  const { mutate, data: bUser } = api.bistroUser.get.useMutation();
  // console.log(bUser);

  const { mutate: deleteBistro, isError: deleteError } =
    api.bistro.delete.useMutation({
      onSuccess: () => {
        ctx.bistro.getAll.invalidate();
      },
    });

  return (
    <div>
      <h1 className="text-2xl">Bistro</h1>
      <CreateWizard ctx={ctx} />

      <div className="flex">
        {data?.map((elem) => {
          return (
            <div key={elem.id} className="">
              <BistroItem bistro={elem} />
              <Link href={`/bistro/${elem.id}/home`}>link</Link>
              <div>
                <button
                  onClick={() => {
                    mutate({ bistroId: elem.id });
                  }}
                >
                  get infos
                </button>
              </div>
              <button
                className="m-1 outline"
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

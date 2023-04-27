import { Input } from "components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";

const Bistro: React.FC & { withAuth: boolean } = () => {
  const { data } = api.bistro.getAll.useQuery();
  const ctx = api.useContext();

  const { mutate: createBistro, isError: createError } =
    api.bistro.create.useMutation({
      onSuccess: () => {
        ctx.bistro.getAll.invalidate();
      },
    });

  const { mutate: deleteBistro, isError: deleteError } =
    api.bistro.delete.useMutation({
      onSuccess: () => {
        ctx.bistro.getAll.invalidate();
      },
    });

  const [input, setInput] = useState("");

  return (
    <div>
      <h1 className="text-2xl">Bistro</h1>
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
      {data?.map(({ name, id }) => {
        return (
          <div key={id}>
            <Link href={`/bistro/${id}`}>
              {name} - {id}
            </Link>
            <button
              className="m-1 outline"
              onClick={() => {
                deleteBistro({ bistroId: id });
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

Bistro.withAuth = true;

export default Bistro;

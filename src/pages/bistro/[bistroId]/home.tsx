import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import BistroLayout, { useBistro } from "components/layout/bistroLayout";
import { api } from "~/utils/api";

const Home: NextPage = (p) => {
  /**
   * add position widget(Mod)
   * positions view
   * - group people by position
   *
   */
  return (
    <div>
      <PositionComponent />
    </div>
  );
};
/**
 */

const PositionComponent = () => {
  console.log(useBistro());

  return (
    <div className="rounded p-5 outline">
      Positions
      <CreatePostitionWizard />
      <ShowPositions />
    </div>
  );
};

const CreatePostitionWizard = () => {
  const [name, setName] = useState("");
  const { bistroId, authority } = useBistro();

  const ctx = api.useContext();
  const { mutate } = api.positions.create.useMutation({
    onSuccess: ({}) => {
      ctx.positions.getAll.invalidate({ bistroId });
    },
  });

  return (
    <div className="m-2 flex rounded p-1 outline">
      <span>create new position</span>
      <input
        className="m-2"
        type="text"
        placeholder="position name"
        onChange={(e) => {
          e.preventDefault();
          setName(e.target.value);
        }}
      />
      |
      <button
        onClick={() => {
          mutate({ postionName: name, bistroId });
        }}
      >
        create
      </button>
    </div>
  );
};

const ShowPositions = () => {
  const { bistroId } = useBistro();
  const ctx = api.useContext();
  const router = useRouter();
  const { data } = api.positions.getAll.useQuery({
    bistroId,
  });

  const { mutate: deletePosition } = api.positions.delete.useMutation({
    onSuccess: ({}) => {
      ctx.positions.getAll.invalidate({ bistroId });
    },
  });

  return (
    <>
      {data?.map((r) => {
        return (
          <div key={r.id} className="flex-row p-1 outline">
            <div>{r.name}</div>
            {r.id}
            <button
              className="m-1 p-1 outline"
              onClick={() => {
                deletePosition({ bistroId, positionId: r.id });
              }}
            >
              x
            </button>
          </div>
        );
      })}
    </>
  );
};

export default BistroLayout(Home);

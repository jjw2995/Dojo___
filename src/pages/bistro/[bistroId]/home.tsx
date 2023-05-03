import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import BistroLayout, { useBistro } from "~/components/layout/bistroLayout";
import { api } from "~/utils/api";

import * as Popover from "@radix-ui/react-popover";
import PopoverDemo from "~/components/popover";

const Home: NextPage = (p) => {
  /**
   * add position widget(Mod)
   * positions view
   * - group people by position
   * - with tip% hourRate
   */
  return (
    <>
      <PositionComponent />
    </>
  );
};
/**
 */

const PositionComponent = () => {
  console.log(useBistro());

  return (
    <div className=" outline">
      Positions
      <CreatePostitionWizard />
      {/* d */}
      <PositionsView />
    </div>
  );
};

const CreatePostitionWizard = () => {
  const [name, setName] = useState("");
  const { bistroId, authority } = useBistro();

  const ctx = api.useContext();
  const { mutate } = api.positions.create.useMutation({
    onSuccess: ({}) => {
      void ctx.positions.getAll.invalidate({ bistroId });
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

const PositionsView = () => {
  const { bistroId } = useBistro();
  const ctx = api.useContext();
  const { data } = api.positions.getAll.useQuery({
    bistroId,
  });

  const { mutate: deletePosition } = api.positions.delete.useMutation({
    onSuccess: ({}) => {
      void ctx.positions.getAll.invalidate({ bistroId });
    },
  });

  /**
   * position +user
   * - user1, user4
   *
   * position2 +user
   * - user3, user5
   */

  return (
    <>
      {data?.map((r) => {
        return (
          <div key={r.id} className="outline">
            <div>{r.name}</div>
            <button
              className="outline"
              onClick={() => {
                deletePosition({ bistroId, positionId: r.id });
              }}
            >
              x
            </button>
            <div>
              <button className="outline">add user +</button>
            </div>
            <PopoverDemo />
          </div>
        );
      })}
    </>
  );
};

export default BistroLayout(Home);

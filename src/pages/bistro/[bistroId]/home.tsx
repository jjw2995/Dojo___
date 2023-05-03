import { NextPage } from "next";
import React from "react";
import { useState } from "react";
import BistroLayout, {
  useBistroContext,
} from "~/components/layout/bistroLayout";
import { RouterOutputs, api } from "~/utils/api";

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
  const { authority } = useBistroContext();

  return (
    <div className=" p-1 outline">
      Positions
      <CreatePostitionWizard />
      {/* d */}
      <PositionsView />
    </div>
  );
};

const CreatePostitionWizard = () => {
  const [name, setName] = useState("");
  const { bistroId, authority } = useBistroContext();

  const ctx = api.useContext();
  const { mutate } = api.positions.create.useMutation({
    onSuccess: ({}) => {
      void ctx.positions.getAll.invalidate({ bistroId });
    },
    // onError: (e) => {
    //   alert("too short");
    // },
  });

  return (
    <div className="m-1 flex items-center justify-center rounded p-1 outline">
      <input
        className=""
        type="text"
        placeholder="create new position"
        onChange={(e) => {
          e.preventDefault();
          setName(e.target.value);
        }}
      />
      <button
        className="rounded p-1 outline"
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
  const { bistroId } = useBistroContext();
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

type BistroUserElem = RouterOutputs["bistroUser"]["getAll"][number];
const BistroUsersView = (bistroUsers: BistroUserElem[]) => {
  return (
    <>
      <div></div>
    </>
  );
};

export default BistroLayout(Home);

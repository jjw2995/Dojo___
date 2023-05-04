import { NextPage } from "next";
import React from "react";
import { useState } from "react";
import BistroLayout, {
  useBistroContext,
} from "~/components/layout/bistroLayout";
import { RouterOutputs, api } from "~/utils/api";

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
  const { authority } = useBistroContext();

  return (
    <div className=" p-1 outline">
      Positions
      <CreatePostitionWizard />
      <PositionList />
    </div>
  );
};

const CreatePostitionWizard = () => {
  const [name, setName] = useState("");
  const { bistroId, authority } = useBistroContext();

  const ctx = api.useContext();
  const { mutate } = api.positions.create.useMutation({
    onSuccess: ({}) => {
      void ctx.positions.getAllWithAssignedBistroUsers.invalidate({ bistroId });
    },
    // onError: (e) => {
    //   alert("too short");
    // },
  });

  return (
    <div className="m-1 my-2 flex items-center justify-between rounded px-1 outline">
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
        className="font-medium"
        onClick={() => {
          mutate({ postionName: name, bistroId });
        }}
      >
        create
      </button>
    </div>
  );
};

const Position = ({ children }) => {
  return (
    <>
      <div>Position</div>
      {children}
    </>
  );
};

const PositionList = () => {
  const { bistroId } = useBistroContext();
  const ctx = api.useContext();
  const { data } = api.positions.getAllWithAssignedBistroUsers.useQuery({
    bistroId,
  });
  // data[0]?.bistroUserPositions
  const { mutate: deletePosition } = api.positions.delete.useMutation({
    onSuccess: ({}) => {
      void ctx.positions.getAllWithAssignedBistroUsers.invalidate({ bistroId });
    },
  });

  /**
   * position +user
   * - user1, user4
   *
   * position2 +user
   * - user3, user5
   */
  // console.log(data);

  // const { data: buWithPos } = api.bistroUser.getAllWithPositions.useQuery({
  //   bistroId,
  // });

  return (
    <>
      {data?.map((r) => {
        const { bistroUserPositions } = r;
        // bistroUserPositions;
        return (
          <div key={r.id} className=" outline">
            <Position>
              <div className="m-1  flex justify-between ">
                <div>
                  <span>{r.name}</span>

                  <PopoverPositionAssigner position={r} />
                </div>
                <button
                  className=" content-center justify-center font-medium"
                  onClick={() => {
                    deletePosition({ bistroId, positionId: r.id });
                  }}
                >
                  x
                </button>
              </div>
              {bistroUserPositions.map(({ bistroUser, id }) => {
                return (
                  <div key={id} className="m-1 outline">
                    {bistroUser.user?.name}, {bistroUser.authority}
                  </div>
                );
              })}
            </Position>
          </div>
        );
      })}
    </>
  );
};

type position = RouterOutputs["positions"]["create"];
const PopoverPositionAssigner = ({ position }: { position: position }) => {
  // const { bistroId } = useBistroContext();
  const ctx = api.useContext();
  const { bistroId, id: positionId } = position;
  const { data: unassignedBistroUsers } =
    api.bistroUser.getAllNotAssignedToPosition.useQuery({
      bistroId,
      positionId,
    });

  const {
    mutate: assign,
    data,
    error,
  } = api.bistroUser.assignPosition.useMutation({
    onSuccess: () => {
      ctx.bistroUser.getAllNotAssignedToPosition.invalidate({
        bistroId,
        positionId,
      });
    },
  });
  console.log(error);

  return (
    <Popover.Root>
      <Popover.Trigger className="m-1 rounded-lg px-1 outline">
        asign user
      </Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content className="w-80 bg-slate-200">
          <Popover.Close />
          <Popover.Arrow />
          show all unassigned users
          {unassignedBistroUsers?.map((bistroUser) => {
            // const { user } = bistroUser;

            return (
              <div key={bistroUser.id}>
                <button
                  onClick={() => {
                    assign({
                      bistroId,
                      targetBistroUserId: bistroUser.id,
                      targetPositionId: positionId,
                    });
                  }}
                >
                  {bistroUser.user.name}, {bistroUser.id}
                </button>
              </div>
            );
          })}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

type BistroUserElem = RouterOutputs["bistroUser"]["getAll"][number];
const BistroUserList = (bistroUsers: BistroUserElem[]) => {
  return (
    <>
      <div>
        {bistroUsers.map((e) => {
          const { userId } = e;
          return <div></div>;
        })}
      </div>
    </>
  );
};

export default BistroLayout(Home);

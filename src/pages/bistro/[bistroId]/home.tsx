import { NextPage } from "next";
import React from "react";
import { useState } from "react";
import BistroLayout from "~/components/layout/bistroLayout";
import { RouterInputs, RouterOutputs, api } from "~/utils/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { Authority } from "@prisma/client";
import { Popover } from "@headlessui/react";

const Home: NextPage = (p) => {
  /**
   * add position widget(Mod)
   * positions view
   * - group people by position
   * - with tip% hourRate
   */
  return (
    <>
      <div>
        <span className="text-lg font-bold">Users</span>
        <div className="rounded p-1 outline">
          <PendingMembers />
          <Members />
        </div>
      </div>

      <div>
        <span className="text-lg font-bold">Positions</span>
        <div className="rounded p-1 outline">
          <CreatePostitionWizard />
          <Positions />
        </div>
      </div>
    </>
  );
};

const Members = () => {
  return (
    <div className="font text-base">
      Members
      <div>invitation link button</div>
      <button
        onClick={(e) => {
          e.preventDefault();
          alert("invite link has been copied");
        }}
        className="font-semibold text-slate-500"
      >
        copy invite link
      </button>
    </div>
  );
};

const PendingMembers = () => {
  return <div>PendingMembers</div>;
};

/**
 */
type a = RouterInputs["position"]["create"];
const CreatePostitionWizard = () => {
  const initState = {
    postionName: "",
    hourlyRate: 0,
    positionTipPercent: 0,
  };
  const [position, setPosition] = useState(initState);

  const ctx = api.useContext();
  const { mutate } = api.position.create.useMutation({
    onSuccess: ({}) => {
      void ctx.position.getAllWithAssignedMembers.invalidate();
      setPosition(initState);
    },
  });

  return (
    <div className="mx-2">
      <span className="text-xs font-semibold">create new position</span>
      <div>
        <div className="flex place-content-between rounded pb-3">
          <div className="w-1/4">
            <input
              type="text"
              className="decoration-slate-400 placeholder:text-base placeholder-shown:underline focus:outline-0"
              placeholder="name"
              value={position.postionName}
              onChange={(e) => {
                e.preventDefault();
                setPosition((prev) => {
                  return { ...prev, postionName: e.target.value };
                });
              }}
            />
            {/* <span className="absolute  text-xs">name</span> */}
          </div>
          <input
            type="number"
            className="w-1/5 underline decoration-slate-400 placeholder:text-base focus:no-underline focus:outline-0"
            placeholder="$/hr"
            value={position.hourlyRate === 0 ? "" : position.hourlyRate}
            onChange={(e) => {
              e.preventDefault();
              setPosition((prev) => {
                return { ...prev, hourlyRate: parseFloat(e.target.value) };
              });
            }}
          />
          <input
            type="number"
            className="w-1/5 underline decoration-slate-400 placeholder:text-base focus:no-underline focus:outline-0"
            placeholder="tip ratio"
            value={
              position.positionTipPercent === 0
                ? ""
                : position.positionTipPercent
            }
            onChange={(e) => {
              e.preventDefault();
              setPosition((prev) => {
                return {
                  ...prev,
                  positionTipPercent: parseFloat(e.target.value),
                };
              });
            }}
          />
          <div className="items-center justify-center rounded font-medium outline">
            <button
              onClick={() => {
                const { hourlyRate, positionTipPercent, postionName } =
                  position;
                mutate({
                  hourlyRate,
                  positionTipPercent,
                  postionName,
                });
                setPosition({ ...initState });
              }}
            >
              create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

type positionWithAssingedBistroUsers =
  RouterOutputs["position"]["getAllWithAssignedMembers"];
const Positions = () => {
  const ctx = api.useContext();

  const { data: positionsWithAssignedMembers } =
    api.position.getAllWithAssignedMembers.useQuery();

  return (
    <>
      {positionsWithAssignedMembers?.map((position) => {
        return <Position position={position} />;
      })}
    </>
  );
};

type PositionType = positionWithAssingedBistroUsers[number];

const Position = ({ position }: { position: PositionType }) => {
  const ctx = api.useContext();

  const { mutate: deletePosition } = api.position.delete.useMutation({
    onSuccess: ({}) => {
      void ctx.position.getAllWithAssignedMembers.invalidate();
    },
  });

  return (
    <div key={position.id} className=" m-1 overflow-hidden rounded p-1 outline">
      <div className="m-1 flex justify-between">
        <div className="flex place-content-between content-between justify-between">
          <div className="flex-col">
            <div className="flex ">
              <AssignUserPopover positionId={position.id} />
              <div>
                <span className="text-xl font-bold">{position.name}</span>
                <span className="right-2 ml-1 text-xs font-light">
                  ${position.hourlyRate}/hr, {position.positionTipPercent}%
                  totalTip
                </span>
              </div>
            </div>
          </div>
        </div>
        <button
          className="content-center justify-center font-medium"
          onClick={() => {
            deletePosition({ positionId: position.id });
          }}
        >
          x
        </button>
      </div>
      <AssignedUsers position={position} />
    </div>
  );
};

const AssignedUsers = ({ position }: { position: PositionType }) => {
  const ctx = api.useContext();

  const { mutate: unassignPosition } =
    api.bistroUser.unassignPosition.useMutation({
      onSuccess: ({}) => {
        void ctx.position.getAllWithAssignedMembers.invalidate();
      },
    });

  return (
    <div className="flex overflow-x-auto">
      {[
        ...position.bistroUsers,
        // ...position.bistroUsers,
        // ...position.bistroUsers,
      ].map((v, idx) => {
        return (
          <div
            key={idx}
            className="relative m-1 mt-2 rounded shadow-lg outline"
          >
            <button
              className="absolute -left-1 -top-2 h-4 w-3 bg-white font-medium"
              onClick={() => {
                unassignPosition({
                  bistroUserPositionId: v.bistroUserPositionId,
                });
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
            <BistroUser bistroUser={v} />
          </div>
        );
      })}
    </div>
  );
};

type BistroUser =
  positionWithAssingedBistroUsers[number]["bistroUsers"][number];

const AssignUserPopover = ({ positionId }: { positionId: string }) => {
  const ctx = api.useContext();
  const { data: unassignedBistroUsers } =
    api.bistroUser.getAllNotAssignedToPosition.useQuery({
      positionId,
    });

  const {
    mutate: assignPosition,
    data,
    error,
    // is
  } = api.bistroUser.assignPosition.useMutation({
    onSuccess: () => {
      void ctx.bistroUser.getAllNotAssignedToPosition.invalidate({
        positionId,
      });
      void ctx.position.getAllWithAssignedMembers.invalidate();
    },
  });

  return unassignedBistroUsers ? (
    <Popover>
      {({}) => (
        <>
          <Popover.Button
            className="m-1 cursor-default rounded-full bg-slate-300 bg-transparent px-1 outline focus:outline-2 focus:outline-black"
            disabled={unassignedBistroUsers.length < 1}
          >
            <FontAwesomeIcon icon={faUserPlus} size={"xs"} />
          </Popover.Button>
          <Popover.Panel className="absolute left-1/4 z-10 max-w-[100%] -translate-x-1/4 flex-col rounded bg-slate-200">
            <div className="flex overflow-x-scroll pb-1">
              {[...unassignedBistroUsers].map((bistroUser, idx) => {
                return (
                  <div key={idx} className="m-1 rounded shadow-lg outline">
                    <button
                      onClick={() => {
                        assignPosition({
                          targetBistroUserId: bistroUser.id,
                          targetPositionId: positionId,
                        });
                      }}
                    >
                      <BistroUser bistroUser={{ ...bistroUser }} />
                    </button>
                  </div>
                );
              })}
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  ) : null;
};

const BistroUser = ({
  bistroUser,
}: {
  bistroUser: {
    name: string | null;
    authority: Authority;
    tipPercent?: number;
    id: string;
    image?: string | null;
  };
}) => {
  const { authority, id, image, name, tipPercent } = bistroUser;
  /**
   * show
   * - Authority
   * - name
   *
   */
  const fname = name?.split(" ")[0];
  return (
    <div className=" m-1 flex w-20 flex-col items-center">
      {/* <img src={image} alt="" /> */}
      <span className="text-sm font-bold">
        {/* {name} */}
        {fname}
      </span>
      <div className="text-xs">
        <div>
          {tipPercent}%, {authority === "MODERATOR" ? "modr" : "user"}
        </div>
      </div>
    </div>
  );
};

export default BistroLayout(Home);

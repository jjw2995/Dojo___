import { NextPage } from "next";
import React, { FC, PropsWithChildren, useContext, useState } from "react";
import BistroLayout, {
  CurBistroUserContext,
} from "~/components/layout/bistroLayout";
import { RouterInputs, RouterOutputs, api } from "~/utils/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faUserPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import { Popover } from "@headlessui/react";
import { LINKS } from "~/utils/links";
import { ModButton } from "~/components/modButton";

const Home: NextPage = (p) => {
  /**
   * add position widget(Mod)
   * positions view
   * - group people by position
   * - with tip% hourRate
   */

  const curBUser = useContext(CurBistroUserContext);

  return (
    <>
      {curBUser.isMod && <InviteLink bistroId={curBUser.bistroId} />}
      <div className="m-2 space-y-3 ">
        <div>
          <span className="text-lg font-bold">Members</span>

          {curBUser.isMod && <PendingMembers />}
          <Members />
        </div>
        <div>
          <Popover className="relative">
            <div className="flex text-lg font-bold ">
              Positions
              {curBUser.isMod && (
                <>
                  <Popover.Button>
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Popover.Button>
                </>
              )}
            </div>
            <div>
              <Popover.Panel className="absolute z-10 rounded bg-white outline">
                <CreatePostitionWizard />
              </Popover.Panel>
            </div>
          </Popover>
          <Positions />
        </div>
      </div>
    </>
  );
};

const InviteLink = ({ bistroId }: { bistroId: string | undefined }) => {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          void navigator.clipboard.writeText(
            `${window ? window.location.origin : ""}${
              LINKS.withBistroId(bistroId!).invite
            }`
          );
          alert("invite link has been copied");
        }}
        className="m-2 rounded p-1 font-semibold text-slate-500 outline active:bg-slate-200"
      >
        copy invite link
      </button>
    </>
  );
};

type PendingUser = RouterOutputs["bistro"]["getPendingUsers"][number];
const PendingMembers = () => {
  const ctx = api.useContext();
  const { data: pendingUsers } = api.bistro.getPendingUsers.useQuery();
  const { mutate } = api.bistro.acceptPendingUser.useMutation({
    onSuccess: () => {
      void ctx.bistroUser.getAll.invalidate();
      void ctx.bistro.getPendingUsers.invalidate();
    },
  });

  return pendingUsers && pendingUsers.length > 0 ? (
    <>
      PendingMembers
      <SideScrollDiv>
        {pendingUsers.map((v, i) => {
          return (
            <ModButton
              // className="outline hover:bg-slate-200"
              className="m-1 rounded shadow-lg outline"
              onClick={() => {
                mutate({ userId: v.id });
              }}
              key={i}
            >
              <div className=" m-1 flex min-w-fit flex-col items-center">
                <div className="font-bold">{v.name}</div>
                <div className="text-xs text-slate-400">{v.email}</div>
              </div>
            </ModButton>
          );
        })}
      </SideScrollDiv>
    </>
  ) : null;
};

const Members = () => {
  const ctx = api.useContext();
  const { data: bistroUsers } = api.bistroUser.getAll.useQuery();
  const { mutate: bUserDelete } = api.bistroUser.delete.useMutation({
    onSuccess: () => {
      void ctx.bistroUser.getAll.invalidate();
    },
  });

  return (
    <div className="font  text-base">
      {bistroUsers && (
        <SideScrollDiv>
          {[...bistroUsers, ...bistroUsers, ...bistroUsers].map((v, i) => {
            return (
              <div key={i} className="m-1 flex rounded outline">
                <BistroUser bistroUser={v} />
                <ModButton
                  onClick={() => {
                    bUserDelete({ bistroUserId: v.id });
                  }}
                >
                  x
                </ModButton>
              </div>
            );
          })}
        </SideScrollDiv>
      )}
    </div>
  );
};

/**
 */
const CreatePostitionWizard = () => {
  const initState = {
    postionName: "",
    hourlyRateInCents: 0,
    positionTipPercent: 0,
  };
  const [position, setPosition] = useState(initState);

  const ctx = api.useContext();
  const { mutate } = api.position.create.useMutation({
    onSuccess: ({}) => {
      void ctx.position.getAllWithBistroUsers.invalidate();
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
              className="focus:ouline-0 decoration-slate-400 placeholder:text-base placeholder-shown:underline"
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
            className="w-1/5"
            placeholder="$/hr"
            value={
              position.hourlyRateInCents === 0 ? "" : position.hourlyRateInCents
            }
            onChange={(e) => {
              e.preventDefault();
              setPosition((prev) => {
                return {
                  ...prev,
                  hourlyRateInCents: Number(e.target.value),
                };
              });
            }}
          />
          <input
            type="number"
            className="w-1/5"
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
                const { hourlyRateInCents, positionTipPercent, postionName } =
                  position;
                mutate({
                  hourlyRateInCents,
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
  RouterOutputs["position"]["getAllWithBistroUsers"];
const Positions = () => {
  const ctx = api.useContext();

  const { data: positionsWithAssignedMembers } =
    api.position.getAllWithBistroUsers.useQuery();

  return (
    <>
      {positionsWithAssignedMembers?.map((position, i) => {
        return (
          // <div key={i}>
          <Position key={i} position={position} />
          // </div>
        );
      })}
    </>
  );
};

type PositionType = positionWithAssingedBistroUsers[number];

const Position = ({ position }: { position: PositionType }) => {
  // const [];
  const ctx = api.useContext();
  // position.

  const { mutate: deletePosition } = api.position.delete.useMutation({
    onSuccess: ({}) => {
      void ctx.position.getAllWithBistroUsers.invalidate();
    },
  });

  const curBUser = useContext(CurBistroUserContext);
  // add update position

  const [updateValue, setUpdateValue] = useState(position);

  const updateRate = (num: number) => {
    setUpdateValue((r) => {
      return { ...r, hourlyRateInCents: num };
    });
  };
  const updateTipPerc = (num: number) => {
    setUpdateValue((r) => {
      return { ...r, positionTipPercent: num };
    });
  };

  // console.log(updatedValue);

  return (
    <div className="rounded border-2 shadow">
      <div className="m-1 flex justify-between">
        {/* <div className="flex place-content-between content-between justify-between"> */}
        {curBUser.isMod && <PopoverAssignUser positionId={updateValue.id} />}
        <div className="flex w-full justify-around text-sm">
          <div className=" font-bold">{updateValue.name}</div>

          <div className="flex">
            $
            <OnClickShowInput
              update={updateRate}
              init={Number(updateValue.hourlyRateInCents)}
            >
              {Number(updateValue.hourlyRateInCents)}
            </OnClickShowInput>
            /hr
          </div>
          <div className="flex">
            <OnClickShowInput
              update={updateTipPerc}
              init={Number(updateValue.positionTipPercent)}
            >
              {Number(updateValue.positionTipPercent)}
            </OnClickShowInput>
            % of total tip
          </div>
        </div>
        <ModButton
          className="content-center justify-center font-medium"
          onClick={() => {
            deletePosition({ positionId: updateValue.id });
          }}
        >
          x
        </ModButton>
      </div>
      <AssignedUsers bistroUserPositions={updateValue.bistroUserPositions} />
    </div>
  );
};

const OnClickShowInput = ({
  children,
  update,
  init,
}: {
  children: any;
  update: (num: number) => void;
  init: number;
}) => {
  const [showInput, setShowInput] = useState(false);
  const [val, setVal] = useState(init);

  return (
    <div
      onClick={() => {
        setShowInput(true);
      }}
      onBlur={() => {
        setShowInput(false);
        update(val);
      }}
    >
      {!showInput ? (
        children
      ) : (
        <input
          className="w-8 max-w-fit"
          type="number"
          autoFocus
          value={val}
          onChange={(e) => {
            setVal(Number(e.target.value));
          }}
        />
      )}
    </div>
  );
};

const SideScrollDiv: FC<PropsWithChildren> = (props) => {
  return <div className=" flex overflow-x-scroll">{props.children}</div>;
};

const AssignedUsers = ({
  bistroUserPositions: bistroUserPositions,
}: {
  bistroUserPositions: PositionType["bistroUserPositions"];
}) => {
  const ctx = api.useContext();

  const { mutate: unassignPosition } =
    api.bistroUser.unassignPosition.useMutation({
      onSuccess: ({}) => {
        void ctx.position.getAllWithBistroUsers.invalidate();
      },
    });

  return (
    <SideScrollDiv>
      {[
        ...bistroUserPositions,
        // ...bistroUserPositions,
      ].map((v, idx) => {
        return (
          <div
            key={idx}
            className="relative m-1 rounded shadow shadow-slate-300 outline outline-1 "
          >
            <ModButton
              className="absolute -left-1 -top-2 h-4 w-3 bg-white font-medium"
              onClick={() => {
                unassignPosition({
                  bistroUserPositionId: v.id,
                });
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </ModButton>
            <BistroUser bistroUser={v.bistroUser} />
          </div>
        );
      })}
    </SideScrollDiv>
  );
};

const PopoverAssignUser = ({ positionId }: { positionId: string }) => {
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
      void ctx.position.getAllWithBistroUsers.invalidate();
    },
  });

  return unassignedBistroUsers ? (
    <Popover className="relative">
      {({}) => (
        <>
          <Popover.Button
            className="m-1 cursor-default rounded-full bg-slate-300 bg-transparent px-1 outline focus:outline-2 focus:outline-black"
            disabled={unassignedBistroUsers.length < 1}
          >
            <FontAwesomeIcon icon={faUserPlus} size={"xs"} />
          </Popover.Button>
          {/* <Popover.Panel className="absolute left-1/4 z-10 max-w-[100%] -translate-x-1/4 flex-col rounded bg-slate-200"> */}
          <Popover.Panel className="absolute left-0 w-72 bg-slate-200">
            <SideScrollDiv>
              {[
                ...unassignedBistroUsers,
                // ...unassignedBistroUsers,
                // ...unassignedBistroUsers,
                // ...unassignedBistroUsers,
              ].map((bistroUser, idx) => {
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
                      <BistroUser bistroUser={bistroUser} />
                    </button>
                  </div>
                );
              })}
            </SideScrollDiv>
          </Popover.Panel>
        </>
      )}
    </Popover>
  ) : null;
};

type BistroUser = RouterOutputs["bistroUser"]["getAll"][number];
const BistroUser = ({
  bistroUser,
}: {
  bistroUser: BistroUser & { tipPercent?: number };
}) => {
  const { authority, id, user } = bistroUser;
  const { name } = user;

  /**
   *
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
          {authority === "MODERATOR" ? "modr" : "user"}
          {bistroUser.tipPercent}
        </div>
      </div>
    </div>
  );
};

export default BistroLayout(Home);

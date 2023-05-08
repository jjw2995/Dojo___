import { NextPage } from "next";
import React from "react";
import { useState } from "react";
import BistroLayout from "~/components/layout/bistroLayout";
import { RouterInputs, RouterOutputs, api } from "~/utils/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

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
    <div className="pb-5">
      <CreatePostitionWizard />
      <Positions />
    </div>
  );
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
    <div className="mb-2 flex p-2 outline">
      <input
        className="w-1/4"
        type="text"
        placeholder="name"
        value={position.postionName}
        onChange={(e) => {
          e.preventDefault();
          setPosition((prev) => {
            return { ...prev, postionName: e.target.value };
          });
        }}
      />
      <input
        className="w-1/4"
        type="number"
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
        className="w-1/4"
        type="number"
        placeholder="tip ratio"
        value={
          position.positionTipPercent === 0 ? "" : position.positionTipPercent
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
      <button
        className="w-1/4 font-medium"
        onClick={() => {
          const { hourlyRate, positionTipPercent, postionName } = position;
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
    <div key={position.id} className=" overflow-hidden p-2 outline">
      <div className="m-1 flex justify-between">
        <div className="flex place-content-between content-between justify-between">
          <div className="flex-col">
            <div className="flex items-center align-middle">
              <HLDPOP positionId={position.id} />
              <div className="ml-1 text-lg font-bold">{position.name}</div>
            </div>
            <span>
              ${position.hourlyRate}/hr, totalTip x{" "}
              {position.positionTipPercent}
            </span>
            {/* <div className="text-sm font-thin"></div> */}
          </div>
        </div>
        <button
          className=" content-center justify-center font-medium"
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
    <div className="flex overflow-x-auto pb-2 ">
      {[...position.bistroUsers].map((v, idx) => {
        return (
          <div key={idx} className="m-1 rounded shadow-lg outline">
            <div>
              <button
                className="p-1 font-medium"
                onClick={() => {
                  unassignPosition({
                    bistroUserPositionId: v.bistroUserPositionId,
                  });
                }}
              >
                x
              </button>
            </div>
            <BistroUser bistroUser={v} />
          </div>
        );
      })}
    </div>
  );
};

const HLDPOP = ({ positionId }: { positionId: string }) => {
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
      <Popover.Button
        className="m-1 rounded-full px-1 outline"
        disabled={unassignedBistroUsers.length < 1}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </Popover.Button>
      <Popover.Panel className="absolute left-1/2 z-10 max-w-[100%] -translate-x-1/2 flex-col bg-slate-200">
        <div className="flex overflow-x-scroll pb-2">
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
  return (
    <div className="w-24 flex-col content-center ">
      {/* <>{image}</> */}
      <div>{name}</div>
      <div>{authority === "MODERATOR" ? "modr" : "user"}</div>
      {/* <div>{id}</div> */}
      {tipPercent && <div>{tipPercent}%</div>}
    </div>
  );
};

export default BistroLayout(Home);

// const PopoverPositionAssigner = ({ positionId }: { positionId: string }) => {
//   const ctx = api.useContext();
//   const { data: unassignedBistroUsers } =
//     api.bistroUser.getAllNotAssignedToPosition.useQuery({
//       positionId,
//     });

//   const {
//     mutate: assignPosition,
//     data,
//     error,
//   } = api.bistroUser.assignPosition.useMutation({
//     onSuccess: () => {
//       ctx.bistroUser.getAllNotAssignedToPosition.invalidate({
//         positionId,
//       });
//     },
//   });

//   return (
//     <Popover.Root>
//       <Popover.Trigger className="m-1 rounded-lg px-1 outline">
//         assign user
//       </Popover.Trigger>
//       <Popover.Anchor />
//       <Popover.Portal className="flex overflow-x-auto bg-slate-200 pb-2">
//         <Popover.Content
//           className="flex overflow-x-auto bg-slate-200 pb-2"
//           asChild
//         >
//           <>
//             {/* <Popover.Content className="bg-slate-200 "> */}
//             {/* <Popover.Close />
//             <Popover.Arrow /> */}
//             show all unassigned users
//             <div className="flex overflow-scroll">
//               {/* <div className="flex overflow-x-auto pb-2"> */}
//               {unassignedBistroUsers &&
//                 [
//                   ...unassignedBistroUsers,
//                   ...unassignedBistroUsers,
//                   ...unassignedBistroUsers,
//                 ]?.map((bistroUser, idx) => {
//                   // const { user } = bistroUser;

//                   return (
//                     <div key={idx} className="m-1 rounded outline">
//                       <button
//                         onClick={() => {
//                           assignPosition({
//                             targetBistroUserId: bistroUser.id,
//                             targetPositionId: positionId,
//                           });
//                         }}
//                       >
//                         <BistroUser bistroUser={{ ...bistroUser }} />
//                       </button>
//                     </div>
//                   );
//                 })}
//             </div>
//             {/* </div> */}
//           </>
//         </Popover.Content>
//       </Popover.Portal>
//     </Popover.Root>
//   );
// };

// type BistroUser =
//   positionWithAssingedBistroUsers[number]["bistroUsers"][number];

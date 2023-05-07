import { NextPage } from "next";
import React from "react";
import { useState } from "react";
import BistroLayout from "~/components/layout/bistroLayout";
import { RouterOutputs, api } from "~/utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
// import * as Popover from "@radix-ui/react-popover";

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
      <CreatePostitionWizard />
      <Positions />
    </>
  );
};
/**
 */

const CreatePostitionWizard = () => {
  const [name, setName] = useState("");

  const ctx = api.useContext();
  const { mutate } = api.position.create.useMutation({
    onSuccess: ({}) => {
      void ctx.position.getAllWithAssignedMembers.invalidate();
    },
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
          mutate({ postionName: name });
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

  const { mutate: deletePosition } = api.position.delete.useMutation({
    onSuccess: ({}) => {
      void ctx.position.getAllWithAssignedMembers.invalidate();
    },
  });

  const { mutate: unassignPosition } =
    api.bistroUser.unassignPosition.useMutation({
      onSuccess: ({}) => {
        void ctx.position.getAllWithAssignedMembers.invalidate();
      },
    });

  return (
    <>
      {positionsWithAssignedMembers?.map((position) => {
        return <Position position={position} />;
      })}
    </>
  );
};

const Position = ({ position }) => {
  return (
    <div key={position.id} className=" overflow-hidden p-2 outline">
      <div
        className="m-1 flex place-content-around content-around
            justify-between align-middle"
      >
        <div className="flex place-content-between content-between justify-between">
          <div className="flex">
            <div className="mr-1 text-3xl font-bold">{position.name},</div>
            <div className="text-xs font-thin">
              <div>$16.45/hr</div>
              <div>tip*{position.positionTipProportion}.7</div>
            </div>
          </div>
          <HLDPOP positionId={position.id} />
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
      <div className="flex overflow-x-auto pb-2 ">
        {[...position.bistroUsers, ...position.bistroUsers].map((v, idx) => {
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
  } = api.bistroUser.assignPosition.useMutation({
    onSuccess: () => {
      ctx.bistroUser.getAllNotAssignedToPosition.invalidate({
        positionId,
      });
    },
  });

  return (
    <Popover>
      <Popover.Button className="m-1 rounded-lg px-1 outline">
        assign user
      </Popover.Button>
      <Popover.Panel className="absolute left-1/2 w-[80%] -translate-x-1/2 flex-col bg-slate-200">
        <div className="flex overflow-x-scroll pb-2">
          {unassignedBistroUsers &&
            [
              ...unassignedBistroUsers,
              ...unassignedBistroUsers,
              ...unassignedBistroUsers,
            ]?.map((bistroUser, idx) => {
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
  );
};

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

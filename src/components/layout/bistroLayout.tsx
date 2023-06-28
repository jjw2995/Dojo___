import { useRouter } from "next/router";
import React, { createContext, type PropsWithChildren } from "react";
import WithAuth from "~/hoc/withAuth";
import { type RouterOutputs, api } from "~/utils/api";
import { LINKS } from "~/utils/links";
import { BottomNav } from "../bottomNav";

import TopNavBar from "../topNavbar";

const useInviteLink = (bistroId: string) => {
  void navigator.clipboard.writeText(
    `${window ? window.location.origin : ""}${
      LINKS.withBistroId(bistroId!).invite
    }`
  );
  alert("invite link has been copied");

  return;
};

export type bistroMemberType = RouterOutputs["bistroUser"]["getSelf"] & {
  isMod: boolean;
};

export const CurBistroUserContext = createContext<bistroMemberType | undefined>(
  undefined
);
// {} as bistroMemberType

// used for urls /bistro/[bistroId]/*
const BistroLayout = <P extends PropsWithChildren>(
  Component: React.ComponentType<P>
) => {
  const Wrap = (props: P) => {
    const router = useRouter();
    const { isReady } = router;
    // console.log(router.query);

    const { data: bUser } = api.bistroUser.getSelf.useQuery(undefined, {
      retry: false,
      onError: () => {
        void router.push({ pathname: LINKS.bistro });
      },
    });

    return isReady && bUser ? (
      <CurBistroUserContext.Provider
        value={{ ...bUser, isMod: bUser.authority === "MODERATOR" }}
      >
        <div className="rw flex flex-col ">
          <TopNavBar />
          <div className="pt-16">
            <Component {...props} />
          </div>
          <BottomNav bistroId={bUser.bistroId} />
        </div>
      </CurBistroUserContext.Provider>
    ) : null;
  };

  return Wrap;
};

const Wrap = (c: React.ComponentType) => WithAuth(BistroLayout(c));
export default Wrap;

import { useRouter } from "next/router";
import React, { type PropsWithChildren } from "react";
import WithAuth from "~/hoc/withAuth";
import { type RouterOutputs, api } from "~/utils/api";
import { LINKS } from "~/utils/links";
import { Nav } from "../nav";

// used for urls /bistro/[bistroId]/*
const BistroLayout = <P extends PropsWithChildren>(
  Component: React.ComponentType<P>
) => {
  const Wrap = (props: P) => {
    const router = useRouter();
    const { isReady } = router;

    const { data: bUser } = api.bistroUser.getSelf.useQuery(undefined, {
      retry: false,
      onError: () => {
        void router.push({ pathname: LINKS.bistro });
      },
    });

    return isReady && bUser ? (
      <>
        <Nav bistroId={bUser.bistroId} />
        <Component {...props} />
      </>
    ) : null;
  };

  return Wrap;
};

const Wrap = (c: React.ComponentType) => WithAuth(BistroLayout(c));
export default Wrap;

import { useRouter } from "next/router";
import React, { type PropsWithChildren, useEffect, useState } from "react";
import WithAuth from "~/hoc/withAuth";
import { type RouterOutputs, api } from "~/utils/api";
import { LINKS } from "~/utils/links";
import { Nav } from "../nav";

type dataType = RouterOutputs["bistroUser"]["getAll"][number];

// used for urls /bistro/[bistroId]/*
const BistroLayout = <P extends PropsWithChildren>(
  Component: React.ComponentType<P>
) => {
  /**
   * TODO: remove this
   * check user is a member of Bistro
   *
   * True: pass down bistroUser as prop
   * False: redirect to Bistro select page
   */
  const Wrap = (props: P) => {
    const router = useRouter();
    const { isReady } = router;

    const { data: bUser } = api.bistroUser.getSelf.useQuery(undefined, {
      retry: false,
      onError: () => {
        router.push({ pathname: LINKS.bistro });
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

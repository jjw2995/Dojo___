import { BistroUser } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactComponentElement, useEffect } from "react";
import WithAuth from "~/hoc/withAuth";
import { api } from "~/utils/api";
import { links } from "~/utils/links";

const BistroLayout = <P extends Object>(Component: React.ComponentType<P>) => {
  /**
   * TODO:
   * check user is a member of Bistro
   *
   * True: pass down bistroId & bistroUserId as prop
   * False: redirect to Bistro select page
   */
  const Wrap = (props: P) => {
    const router = useRouter();
    const { isReady, query } = router;
    console.log("in bistroLayout", query, isReady);
    const { data, isFetched } = api.bistroUser.getAll.useQuery();
    console.log(data);

    const getBistroUser = (data: BistroUser[]) => {
      return data.find((e) => e.bistroId === query.bistroId);
    };

    if (isReady && isFetched && data) {
      if (!getBistroUser(data)) {
        router.push({ pathname: links.bistro });
      }
    }
    // useEffect(() => {
    // }, [isReady]);

    return isReady && data ? (
      <div>
        BistroLayout
        <Component {...{ ...props, bistroUser: getBistroUser(data) }} />
      </div>
    ) : null;
  };

  return Wrap;
};

// http://localhost:3000/bistro/clh35xx6l0001wm8sm1rjg3jz/home
export default (c: React.ComponentType) => WithAuth(BistroLayout(c));

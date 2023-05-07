import { useRouter } from "next/router";
import React, { type PropsWithChildren, useEffect, useState } from "react";
import WithAuth from "~/hoc/withAuth";
import { type RouterOutputs, api } from "~/utils/api";
import { links } from "~/utils/links";
import { Nav } from "../nav";

type dataType = RouterOutputs["bistroUser"]["getAll"][number];

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
    const { isReady, query } = router;

    const { data, isFetched } = api.bistroUser.getAll.useQuery();
    // api.bistro.getAllUserIsPartOf

    const [bistro, setBistro] = useState<dataType>();

    useEffect(() => {
      if (data) {
        setBistro(data.find((e) => e.bistroId === query.bistroId));
      }
    }, [data, query]);

    const getBistroUser = (data: dataType[]) => {
      const temp = data.find((e) => e.bistroId === query.bistroId);
      return temp;
    };

    if (isReady && isFetched && data) {
      if (!getBistroUser(data)) {
        void router.push({ pathname: links.bistro });
      }
    }

    return isReady && bistro ? (
      <>
        <Nav bistro={bistro} />
        <Component {...{ ...props }} />
      </>
    ) : null;
  };

  return Wrap;
};

// http://localhost:3000/bistro/clh35xx6l0001wm8sm1rjg3jz/home
const Wrap = (c: React.ComponentType) => WithAuth(BistroLayout(c));
export default Wrap;

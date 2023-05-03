import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import WithAuth from "~/hoc/withAuth";
import { RouterOutputs, api } from "~/utils/api";
import { links } from "~/utils/links";
import { Nav } from "../nav";

type dataType = RouterOutputs["bistroUser"]["getAll"][number];
const bistroContext = createContext<dataType>();

export const useBistro = () => {
  const bistro = useContext(bistroContext);
  return bistro;
};

const BistroLayout = <P extends Object>(Component: React.ComponentType<P>) => {
  /**
   * TODO:
   * check user is a member of Bistro
   *
   * True: pass down bistroUser as prop
   * False: redirect to Bistro select page
   */
  // const z = useContext()
  // const bistroIdCont
  const Wrap = (props: P) => {
    const router = useRouter();
    const { isReady, query } = router;
    console.log("in bistroLayout", query, isReady);
    const { data, isFetched } = api.bistroUser.getAll.useQuery();

    const [bistro, setBistro] = useState<dataType>();

    useEffect(() => {
      if (data) {
        setBistro(data.find((e) => e.bistroId === query.bistroId));
      }
    }, [data]);

    const getBistroUser = (data: dataType[]) => {
      const temp = data.find((e) => e.bistroId === query.bistroId);
      return temp;
    };

    if (isReady && isFetched && data) {
      if (!getBistroUser(data)) {
        router.push({ pathname: links.bistro });
      }
    }

    return isReady && bistro ? (
      <>
        {/* <div className="m-1"> */}
        <Nav bistro={bistro} />
        {/* </div> */}
        <bistroContext.Provider value={bistro}>
          <Component {...{ ...props }} />
        </bistroContext.Provider>
      </>
    ) : null;
  };

  return Wrap;
};

// http://localhost:3000/bistro/clh35xx6l0001wm8sm1rjg3jz/home
export default (c: React.ComponentType) => WithAuth(BistroLayout(c));

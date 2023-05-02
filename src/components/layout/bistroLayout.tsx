import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { createContext, useContext } from "react";
import WithAuth from "~/hoc/withAuth";
import { RouterOutputs, api } from "~/utils/api";
import { links } from "~/utils/links";

type dataType = RouterOutputs["bistroUser"]["getAll"][number];
export const bistroContext = createContext<dataType>();

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

    // const [bistro, setBistro] = useState(null)
    console.log(data);

    // useEffect(()=>{
    //   setBistro(data.find((e) => e.bistroId === query.bistroId))
    // },[data])

    const getBistroUser = (data: dataType[]) => {
      const temp = data.find((e) => e.bistroId === query.bistroId);
      // setBistro(temp)
      return temp;
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
        {/* <Tabs         */}
        <bistroContext.Provider value={getBistroUser(data)}>
          <Component {...{ ...props, bistroUser: getBistroUser(data) }} />
        </bistroContext.Provider>
      </div>
    ) : null;
  };

  return Wrap;
};

// http://localhost:3000/bistro/clh35xx6l0001wm8sm1rjg3jz/home
export default (c: React.ComponentType) => WithAuth(BistroLayout(c));

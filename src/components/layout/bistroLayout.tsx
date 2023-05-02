import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const BistroLayout = <P extends Object>(Component: React.ComponentType<P>) => {
  const Wrap = (props: P) => {
    const { isReady, query } = useRouter();
    // console.log("in bistroLayout", query, isReady);

    return isReady ? (
      <div>
        BistroLayout
        <br />
        <div>
          <button
            onClick={() => {
              signOut();
            }}
          >
            SingOut
          </button>
        </div>
        <Component {...{ ...props, bistroId: query.bistroId }} />
      </div>
    ) : null;
  };
  // const a = useRouter();

  // console.log(a.asPath);

  return Wrap;
};

export default BistroLayout;

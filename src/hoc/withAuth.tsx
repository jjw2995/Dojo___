import {
  faBarsStaggered,
  faHandsHolding,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, {
  type ComponentType,
  type PropsWithChildren,
  useEffect,
} from "react";
import { LINKS } from "~/utils/links";

function withAuth<P extends PropsWithChildren>(Component: ComponentType<P>) {
  // const withAuth = <P extends Object>(Component: React.ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const router = useRouter();
    const { status: sessionStatus, data } = useSession();
    const authorized = sessionStatus === "authenticated";
    const unAuthorized = sessionStatus === "unauthenticated";
    const loading = sessionStatus === "loading";

    useEffect(() => {
      // check if the session is loading or the router is not ready
      if (loading || !router.isReady) return;

      // if the user is not authorized, redirect to the login page
      // with a return url to the current page
      if (unAuthorized) {
        void signIn(undefined, { callbackUrl: router.asPath });
      }
    }, [loading, unAuthorized, sessionStatus, router]);

    // if the user refreshed the page or somehow navigated to the protected page
    if (loading) {
      return <>Loading app...</>;
    }

    return authorized ? (
      <>
        <div className=" flex h-12 items-center justify-between bg-gradient-to-b from-slate-100 p-2">
          <FontAwesomeIcon icon={faBarsStaggered} className="basis-1/12" />

          <FontAwesomeIcon
            icon={faHandsHolding}
            className="text-slate-600"
            size={"xl"}
          />
          {/* {data.user.image ? (
              <img
                loading="lazy"
                src={data.user.image}
                alt=""
                className="w-4 basis-1/12 rounded-full "
              />
            ) : (
             
            )} */}
          {data ? (
            <button
              className="font-bold"
              onClick={() => {
                void signOut({ callbackUrl: LINKS.base });
              }}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span className="text-xs">logout</span>
            </button>
          ) : null}
        </div>
        <Component {...props} />
      </>
    ) : (
      <>redirecting to login...</>
    );
  };
  return Wrapper;
}

export default withAuth;

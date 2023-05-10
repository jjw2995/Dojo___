import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    const { status: sessionStatus } = useSession();
    const authorized = sessionStatus === "authenticated";
    const unAuthorized = sessionStatus === "unauthenticated";
    const loading = sessionStatus === "loading";

    useEffect(() => {
      // check if the session is loading or the router is not ready
      if (loading || !router.isReady) return;

      // if the user is not authorized, redirect to the login page
      // with a return url to the current page
      if (unAuthorized) {
        signIn(undefined, { callbackUrl: router.asPath });
      }
    }, [loading, unAuthorized, sessionStatus, router]);

    // if the user refreshed the page or somehow navigated to the protected page
    if (loading) {
      return <>Loading app...</>;
    }

    return authorized ? (
      <div>
        <div className=" flex items-center justify-between bg-slate-200">
          <div>Dojo Icon</div>
          <button
            className="font-bold"
            onClick={() => {
              void signOut({ callbackUrl: LINKS.base });
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span className="text-xs">logout</span>
          </button>
        </div>
        <Component {...props} />
      </div>
    ) : (
      <>redirecting to login...</>
    );
  };
  return Wrapper;
}

export default withAuth;

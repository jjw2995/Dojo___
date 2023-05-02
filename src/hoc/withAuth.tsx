import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const withAuth = <P extends Object>(Component: React.ComponentType<P>) => {
  const Wrap = (props: P) => {
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
        // console.log("not authorized: ", router);
        router.push({
          pathname: "/login",
          // query: { returnUrl: router.asPath },
        });
      } else {
        // console.log("authorized: ", router);
      }
    }, [loading, unAuthorized, sessionStatus, router]);

    // if the user refreshed the page or somehow navigated to the protected page
    if (loading) {
      return <>Loading app...</>;
    }

    return authorized ? (
      <div>
        <div className="m-2 outline">
          WithAuth
          <div>
            <button
              onClick={() => {
                signOut();
              }}
            >
              SignOut
            </button>
          </div>
        </div>
        <Component {...props} />
      </div>
    ) : (
      <></>
    );
  };

  return Wrap;
};

export default withAuth;

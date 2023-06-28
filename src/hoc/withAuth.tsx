import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, {
  type ComponentType,
  type PropsWithChildren,
  useEffect,
} from "react";

function withAuth<P extends PropsWithChildren>(Component: ComponentType<P>) {
  // {curBUser.isMod && <InviteLink bistroId={curBUser.bistroId} />}

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

    return authorized ? <Component {...props} /> : <>redirecting to login...</>;
  };
  return Wrapper;
}

export default withAuth;

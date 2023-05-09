import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { links } from "~/utils/links";

const Main: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  //

  if (session && session.user) {
    router.replace(links.bistro);
  }

  return (
    <>
      <div className="flex-col">
        <div>landing page</div>
        <button
          className="outline"
          onClick={() => {
            // signIn("google");
            void signIn(undefined, { callbackUrl: "/bistro" });
          }}
        >
          Sign in with Google
        </button>
      </div>
    </>
  );
};

export default Main;

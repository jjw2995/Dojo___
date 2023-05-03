import { type NextPage } from "next";
import { signIn } from "next-auth/react";

const Main: NextPage = () => {
  //
  return (
    <>
      <div>
        <button
          onClick={() => {
            // signIn("google");
            void signIn("google", { callbackUrl: "/bistro" });
          }}
        >
          Sign in with Google
        </button>
      </div>
    </>
  );
};

export default Main;

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Main: NextPage = () => {
  const { data: sessionData, status, update } = useSession();
  //
  return (
    <>
      <div>
        <button
          onClick={() => {
            // signIn("google");
            signIn("google", { callbackUrl: "/bistro" });
          }}
        >
          Sign in with Google
        </button>
      </div>
    </>
  );
};

export default Main;

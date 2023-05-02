import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Main: NextPage = () => {
  const { data: sessionData, status, update } = useSession();
  //
  return (
    <>
      <Head>
        <title>Dojo</title>
        <meta name="description" content="for servers, made by a server" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

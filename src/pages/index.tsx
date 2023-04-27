import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Input } from "components/ui/input";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { data: sessionData, status, update } = useSession();

  return (
    <>
      <Head>
        <title>Dojo</title>
        <meta name="description" content="for servers, made by a server" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-slate-200">
        {sessionData ? (
          <>
            <button
              onClick={() => {
                signOut();
              }}
            >
              sign out
            </button>
          </>
        ) : (
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
        )}
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full px-10 py-3 font-semibold no-underline transition "
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

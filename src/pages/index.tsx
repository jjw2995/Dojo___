import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Input } from "components/ui/input";
import { useState } from "react";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { data: sessionData, status, update } = useSession();
  //
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
            <Bistro />
          </>
        ) : (
          <div>
            <button
              onClick={() => {
                signIn("google");
                // signIn("google", { callbackUrl: "/bistro" });
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

const Bistro: React.FC & { withAuth: boolean } = () => {
  const { data } = api.bistro.getAll.useQuery();
  const ctx = api.useContext();

  const { mutate: createBistro, isError: createError } =
    api.bistro.create.useMutation({
      onSuccess: () => {
        ctx.bistro.getAll.invalidate();
      },
    });

  const { mutate: deleteBistro, isError: deleteError } =
    api.bistro.delete.useMutation({
      onSuccess: () => {
        ctx.bistro.getAll.invalidate();
      },
    });

  const [input, setInput] = useState("");

  return (
    <div>
      <h1 className="text-2xl">Bistro</h1>
      <Input
        className="outline"
        onChange={(e) => {
          e.preventDefault();
          setInput(e.target.value);
        }}
      />
      <button onClick={() => createBistro({ name: input })}>
        create bistro
      </button>
      {data?.map(({ name, id }) => {
        return (
          <div key={id}>
            <Link href={`/bistro/${id}/pay`}>
              {name} - {id}
            </Link>
            <button
              className="m-1 outline"
              onClick={() => {
                deleteBistro({ bistroId: id });
              }}
            >
              x
            </button>
          </div>
        );
      })}
    </div>
  );
};

Bistro.withAuth = true;

// export default Bistro;

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

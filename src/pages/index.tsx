import { faHandsHolding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "~/server/auth";
import { LINKS } from "~/utils/links";

const Main = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className=" text-slate-1000 text-6xl font-bold">Dojo</h1>
        <h3 className="flex flex-col pt-2 text-base text-slate-500">
          <span>from a worker,</span>
          <span>for workers</span>
        </h3>
        <div className="mb-10 flex w-screen flex-col place-items-center text-center">
          <FontAwesomeIcon icon={faHandsHolding} className="mx-4 max-w-lg" />
          <div className="my-4 flex flex-col text-lg font-semibold text-slate-500">
            <span>Track restaurant operations,</span>
            <span>from tips to scheduling</span>
          </div>
        </div>
        <span className="text-center font-semibold text-slate-700 ">start</span>
        <div className="flex min-w-fit flex-col rounded">
          {/* <div className="flex w-60 flex-col overflow-hidden rounded outline outline-4 outline-slate-500"> */}
          {Object.values(providers).map(({ id, name }) => {
            return (
              <button
                key={id}
                className="font-base m-1 flex select-none items-center justify-center rounded px-3 text-slate-500 outline outline-slate-500 hover:bg-slate-300 active:text-black"
                onClick={() => void signIn(id, { callbackUrl: LINKS.bistro })}
              >
                <img
                  src={`https://authjs.dev/img/providers/${id}.svg`}
                  alt=""
                  className="m-1 w-7 p-1"
                />
                Sign in with {name}
              </button>
              // </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Main;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: LINKS.bistro } };
  }

  const providers = await getProviders();

  return { props: { providers: providers ?? [] } };
}

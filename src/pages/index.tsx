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
  const router = useRouter();

  console.log(providers);
  // console.log(providers.values);

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className=" text-slate-1000 text-6xl font-bold">Dojo</h1>
        <h3 className="flex flex-col pt-2 text-base text-slate-500">
          <span>from a worker,</span>
          <span>for workers</span>
        </h3>
        <FontAwesomeIcon icon={faHandsHolding} className="mb- max-w-sm" />
        <div className="m-4 flex flex-col place-items-center text-center">
          <div className="my-4 flex flex-col text-lg font-semibold text-slate-500">
            <span>Track restaurant operations,</span>
            <span>from tips to scheduling</span>
          </div>
        </div>
        <span className="m-2 p-2 text-center font-semibold text-slate-700 ">
          start
        </span>
        <button
          onClick={() => {
            // signIn("google");
            void signIn(undefined, { callbackUrl: LINKS.bistro });
          }}
        ></button>
        <div className="flex w-60 flex-col overflow-hidden rounded outline outline-4 outline-slate-500">
          {Object.values(providers).map(
            ({ callbackUrl, id, name, signinUrl }) => {
              return (
                <button
                  key={id}
                  className="flex items-center justify-center  font-medium text-slate-500 outline outline-slate-500 hover:bg-slate-300 hover:text-slate-700"
                  onClick={() => signIn(id)}
                >
                  <img
                    src={`https://authjs.dev/img/providers/${id}.svg`}
                    alt=""
                    className="m-1 w-8 p-1"
                  />
                  Sign in with {name}
                </button>
                // </div>
              );
            }
          )}
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

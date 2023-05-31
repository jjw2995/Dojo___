import { useRouter } from "next/router";
import React, { createContext, type PropsWithChildren } from "react";
import WithAuth from "~/hoc/withAuth";
import { type RouterOutputs, api } from "~/utils/api";
import { LINKS } from "~/utils/links";
import { Nav } from "../nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHolding,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

const InviteLink = ({ bistroId }: { bistroId: string | undefined }) => {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          void navigator.clipboard.writeText(
            `${window ? window.location.origin : ""}${
              LINKS.withBistroId(bistroId!).invite
            }`
          );
          alert("invite link has been copied");
        }}
        className="m-2 rounded p-1 font-semibold text-slate-500 outline active:bg-slate-200"
      >
        copy invite link
      </button>
    </>
  );
};

type bUserType = RouterOutputs["bistroUser"]["getSelf"] & { isMod: boolean };

export const CurBistroUserContext = createContext<bUserType>({} as bUserType);

// used for urls /bistro/[bistroId]/*
const BistroLayout = <P extends PropsWithChildren>(
  Component: React.ComponentType<P>
) => {
  const Wrap = (props: P) => {
    const router = useRouter();
    const { isReady } = router;
    console.log(router.query);

    const { data: bUser } = api.bistroUser.getSelf.useQuery(undefined, {
      retry: false,
      onError: () => {
        void router.push({ pathname: LINKS.bistro });
      },
    });

    return isReady && bUser ? (
      <CurBistroUserContext.Provider
        value={{ ...bUser, isMod: bUser.authority === "MODERATOR" }}
      >
        <Nav bistroId={bUser.bistroId} />
        <NavBar data={bUser} />

        <Component {...props} />
      </CurBistroUserContext.Provider>
    ) : null;
  };

  return Wrap;
};

const NavBar = ({ data }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-36 bg-base-100 p-2 shadow"
          >
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <FontAwesomeIcon
          icon={faHandsHolding}
          fill="none"
          className="h-12 w-12 text-slate-600"
          size={"2xl"}
        />
        {/* <a className="btn-ghost btn text-xl normal-case">daisyUI</a> */}
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-9 rounded-full">
              {data && data.user.image ? (
                <img
                  loading="lazy"
                  src={data.user.image}
                  alt=""
                  className="w-4 basis-1/12 rounded-full "
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
                </svg>
              )}
              {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-44 bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a
                className="justify-between"
                onClick={() => {
                  void signOut({ callbackUrl: LINKS.base });
                }}
              >
                Logout
                <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Wrap = (c: React.ComponentType) => WithAuth(BistroLayout(c));
export default Wrap;

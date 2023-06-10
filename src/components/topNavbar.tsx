import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { CurBistroUserContext } from "./layout/bistroLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHolding,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { LINKS } from "~/utils/links";
import { signOut } from "next-auth/react";

const useInviteLink = (bistroId: string) => {
  void navigator.clipboard.writeText(
    `${window ? window.location.origin : ""}${
      LINKS.withBistroId(bistroId!).invite
    }`
  );
  alert("invite link has been copied");

  return;
};

const TopNavBar: FC = () => {
  const router = useRouter();
  const bistroUser = useContext(CurBistroUserContext);

  return (
    <div className="z-50 mb-16">
      <div className="navbar fixed top-0 z-50 bg-base-100">
        <div className="navbar-start">
          {bistroUser ? (
            <div
              className="w-9"
              onClick={() => {
                router.push(LINKS.bistro);
              }}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          ) : (
            <a
              onClick={() => {
                void signOut({ callbackUrl: LINKS.base });
              }}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                className="w-10"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </a>
          )}
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
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-9 rounded-full">
                {bistroUser && bistroUser.user.image ? (
                  <img
                    loading="lazy"
                    src={bistroUser.user.image}
                    alt=""
                    className="w-4 basis-1/12 rounded-full "
                  />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
                  </svg>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3  bg-base-100 p-2 shadow"
            >
              {bistroUser ? (
                <li>
                  <button
                    onClick={() => {
                      useInviteLink(bistroUser.bistroId);
                    }}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      className="w-6 items-center"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>
                    Invite
                  </button>
                </li>
              ) : (
                <></>
              )}
              <li>
                <a
                  onClick={() => {
                    void signOut({ callbackUrl: LINKS.base });
                  }}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    className="w-6 items-center"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;

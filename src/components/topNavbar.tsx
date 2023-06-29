import { useRouter } from "next/router";
import { FC, useContext, useRef } from "react";
import { CurBistroUserContext } from "./layout/bistroLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHolding,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { LINKS } from "~/utils/links";
import { signOut } from "next-auth/react";

const inviteLink = (bistroId: string) => {
  void navigator.clipboard.writeText(
    `${window ? window.location.origin : ""}${
      LINKS.withBistroId(bistroId).invite
    }`
  );
  alert("invite link has been copied");

  return;
};

const TopNavBar: FC = () => {
  const router = useRouter();
  const bistroUser = useContext(CurBistroUserContext);
  const modalRef = useRef<HTMLDialogElement>(null);

  // add white transition below navbar
  // bg-transparent  bg-gradient-to-b from-white
  return (
    <div className="rw navbar fixed top-0 z-50 h-8 bg-white p-0 px-2">
      <div className="navbar-start">
        {bistroUser ? (
          <div
            className="w-6"
            onClick={() => {
              void router.push(LINKS.bistro);
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
              className="w-8"
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
      <FontAwesomeIcon
        icon={faHandsHolding}
        fill="none"
        className="navbar-center h-6 w-6 text-slate-600"
        // size={"1x"}
      />
      <div className="navbar-end">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="avatar w-6 rounded-full">
              {bistroUser && bistroUser.user.image ? (
                <img
                  loading="lazy"
                  src={bistroUser.user.image}
                  alt=""
                  className="w-6 basis-1/12 rounded-full "
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
            className="menu-compact dropdown-content menu rounded-box mt-3  bg-base-100 p-2 shadow"
          >
            {bistroUser ? (
              <li>
                <button
                  onClick={() => {
                    inviteLink(bistroUser.bistroId);
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
                  strokeWidth={1.5}
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
            <li>
              <a
                onClick={() => {
                  if (modalRef.current) modalRef.current.showModal();
                }}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-6 items-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                Help
              </a>
            </li>
          </ul>
          <dialog ref={modalRef} className="modal">
            <form method="dialog" className="modal-box text-center">
              <div className="text-lg">Tap on Section Titles to get Hints</div>
              <div className="mt-2">
                (ex. <span className="section-title">Bistros</span>,{" "}
                <span className="section-title">Search & Create</span>)
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;

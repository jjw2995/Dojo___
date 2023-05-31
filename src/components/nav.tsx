import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import type { RouterOutputs } from "~/utils/api";
import { LINKS } from "~/utils/links";

type bistroType = RouterOutputs["bistroUser"]["getAll"][number];

const LinkWrap: React.FC<PropsWithChildren & { href: string }> = ({
  href,
  children,
}) => {
  const router = useRouter();
  console.log(router.asPath);

  return (
    <Link href={href} className={router.asPath === href ? "active" : ""}>
      {children}
    </Link>
  );
};
export const Nav = ({ bistroId }: { bistroId: string }) => {
  return (
    <>
      <div className="btm-nav">
        <LinkWrap href={LINKS.withBistroId(bistroId).home}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="btm-nav-label">Home</span>
        </LinkWrap>
        <LinkWrap href={LINKS.withBistroId(bistroId).pay}>
          <svg
            fill="none"
            stroke="currentColor"
            // className="h-5 w-5"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <span className="btm-nav-label">Pay</span>
        </LinkWrap>
        <LinkWrap href={LINKS.withBistroId(bistroId).menu}>
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="btm-nav-label">Menu</span>
        </LinkWrap>
      </div>
    </>
  );

  return (
    <div className="my-2 flex justify-around py-1 outline">
      <Link className="m-1 " href={LINKS.withBistroId(bistroId).home}>
        Home
      </Link>
      <Link className="m-1 " href={LINKS.withBistroId(bistroId).pay}>
        Pay
      </Link>
      <Link className="m-1 " href={LINKS.withBistroId(bistroId).menu}>
        Menu
      </Link>
    </div>
  );
};

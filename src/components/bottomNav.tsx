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

  return (
    <Link href={href} className={router.asPath === href ? "active" : ""}>
      {children}
    </Link>
  );
};

export const BottomNav = ({ bistroId }: { bistroId: string }) => {
  return (
    <>
      <div className="btm-nav btm-nav-sm">
        <LinkWrap href={LINKS.withBistroId(bistroId).home}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              // strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="btm-nav-label">Home</span>
        </LinkWrap>
        <LinkWrap href={LINKS.withBistroId(bistroId).pay}>
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <span className="btm-nav-label">Pay</span>
        </LinkWrap>
        <LinkWrap href={LINKS.withBistroId(bistroId).menu}>
          <svg
            fill="none"
            stroke="currentColor"
            // strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>

          <span className="btm-nav-label">Menu</span>
        </LinkWrap>
      </div>
    </>
  );
};

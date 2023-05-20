import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";
import { LINKS } from "~/utils/links";

type bistroType = RouterOutputs["bistroUser"]["getAll"][number];
export const Nav = ({ bistroId }: { bistroId: string }) => {
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

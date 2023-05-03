import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";
import { links } from "~/utils/links";

type bistroType = RouterOutputs["bistroUser"]["getAll"][number];
export const Nav = ({ bistro }: { bistro: bistroType }) => {
  const { bistroId } = bistro;
  return (
    <div className="my-2 flex justify-around py-1 outline">
      <Link className="m-1 " href={links.withBistroId(bistroId).home}>
        Home
      </Link>
      <Link className="m-1 " href={links.withBistroId(bistroId).pay}>
        Pay
      </Link>
      <Link className="m-1 " href={links.withBistroId(bistroId).menu}>
        Menu
      </Link>
    </div>
  );
};

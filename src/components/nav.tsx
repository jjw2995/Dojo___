import { useBistro } from "~/components/layout/bistroLayout";
import Link from "next/link";
import { RouterOutputs } from "~/utils/api";
import { links } from "~/utils/links";

type bistroType = RouterOutputs["bistroUser"]["getAll"][number];
export const Nav = ({ bistro }: { bistro: bistroType }) => {
  const { bistroId } = bistro;
  return (
    <div className="flex justify-between outline">
      <Link className="m-1 outline" href={links.withBistroId(bistroId).home}>
        Home
      </Link>
      <Link className="m-1 outline" href={links.withBistroId(bistroId).pay}>
        Pay
      </Link>
      <Link className="m-1 outline" href={links.withBistroId(bistroId).menu}>
        Menu
      </Link>
    </div>
  );
};

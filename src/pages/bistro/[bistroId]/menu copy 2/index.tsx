import { NextPage } from "next";

const Menu: NextPage & { withAuth: boolean } = () => {
  return <div>menu</div>;
};

Menu.withAuth = true;

export default Menu;

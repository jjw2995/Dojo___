import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Pay: NextPage = () => {
  const { data: sessionData } = useSession();
  return <div>asd</div>;
};

export default Pay;

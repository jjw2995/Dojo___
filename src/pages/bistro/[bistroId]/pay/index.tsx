import { NextPage } from "next";

const Pay: NextPage & { withAuth: boolean } = () => {
  return <div>Pay</div>;
};

Pay.withAuth = true;

export default Pay;

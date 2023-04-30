import { NextPage } from "next";
import React from "react";

const Pay: NextPage & { withAuth: boolean } = () => {
  return <div>Pay</div>;
};
/**
 * tipForm (form, eq, vars)
 * dailyTip (daily)
 * position ratio
 *
 */

Pay.withAuth = true;

const Tip: React.FC = () => {
  return <div></div>;
};

export default Pay;

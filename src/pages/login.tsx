import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { LINKS } from "~/utils/links";

const Login = () => {
  const router = useRouter();
  const { isReady, query } = router;

  if (!isReady) return <div>Loading...</div>;

  return query && query.returnUrl
    ? void signIn(undefined, { callbackUrl: router.query.returnUrl as string })
    : void signIn(undefined, { callbackUrl: LINKS.bistro });
};
export default Login;

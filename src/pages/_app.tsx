import { AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ProtectedLayout } from "~/components/layout/protectedLayouts";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

// ============================================================

// add requireAuth to AppProps
type AppPropsWithAuth = AppProps & {
  Component: {
    withAuth?: boolean;
  };
};

// function MyApp({ Component, pageProps }: AppPropsWithAuth) {
//   return (
//     <SessionProvider session={pageProps.session}>
//       {Component.withAuth ? (
//         <ProtectedLayout>
//           <Component {...pageProps} />
//         </ProtectedLayout>
//       ) : (
//         <Component />
//         // <div>unauthenticated</div>
//         // <Component {...pageProps} />
//       )}
//     </SessionProvider>
//   );
// }

export default api.withTRPC(MyApp);

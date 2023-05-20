import { useRouter } from "next/router";
import withAuth from "~/hoc/withAuth";
import { api } from "~/utils/api";
import { LINKS } from "~/utils/links";

const Invite = () => {
  const router = useRouter();
  const bistroId = router.query.bistroId as string;
  const { mutate } = api.bistro.requestJoin.useMutation();

  api.bistroUser.getSelf.useQuery(undefined, {
    onError: () => {
      mutate({ bistroId });
      void router.push(LINKS.bistro);
    },
    onSuccess: () => {
      void router.push(LINKS.withBistroId(bistroId).home);
    },
    retry: false,
  });
  return <div>invite</div>;
};

export default withAuth(Invite);

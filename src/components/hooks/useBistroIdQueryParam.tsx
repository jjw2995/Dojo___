import { useRouter } from "next/router";
import { z } from "zod";

export const useBistroIdQueryParam = () => {
  const a = useRouter().query;

  // console.log(a);
  // console.log(z.string().parse(24));
  // TODO: add redirect to bistro page
  try {
    return z.string().parse(a.bistroId);
  } catch (error) {}
};

// export const bistroId = useBistroIdQueryParam();

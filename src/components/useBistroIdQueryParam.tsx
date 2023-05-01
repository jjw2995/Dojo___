import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";

export const useBistroIdQueryParam = () => {
  const { bistroId } = useRouter().query;

  // console.log(z.string().parse(24));
  // TODO: add redirect to bistro page
  return z.string().parse(bistroId);
};

// export const bistroId = useBistroIdQueryParam();

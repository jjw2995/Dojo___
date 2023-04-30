import { z } from "zod";

const tipProportionSchema = z.map(z.string().datetime(), z.number());
export type tipProportion = z.infer<typeof tipProportionSchema>;
export const tipProportion = {
  get: () => {},
};

// tipFormula

// {
// equation: {}
// variables: {q12d: "hallTip", 1qwe2: "togoTip"}
// }

import React, { useContext } from "react";
import { CurBistroUserContext } from "./layout/bistroLayout";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

export const ModButton: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  const bUser = useContext(CurBistroUserContext);

  return bUser && bUser.isMod ? <button {...rest}>{children}</button> : null;
};

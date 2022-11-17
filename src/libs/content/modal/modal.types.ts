import { ReactNode } from "react";

export type modalProps = {
  children: ReactNode;
  isShowing: boolean;
  hide: () => void;
};

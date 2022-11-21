import { ReactNode } from "react";

export type modalProps = {
  children: ReactNode;
  isShowing: boolean;
  title?: string;
  hide: () => void;
};

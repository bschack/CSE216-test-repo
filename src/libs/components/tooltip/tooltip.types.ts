import { ReactNode } from "react";

export type tooltipProps = {
  tip: string;
  direction?: "top" | "bottom";
  children: ReactNode;
  disabled?: boolean;
};

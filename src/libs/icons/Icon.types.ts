import { SVGProps } from "react";

export type IconProps = {
  color?: string;
  width?: number | string;
  height?: number | string;
  strokeColor?: string;
  strokeWidth?: number;
} & SVGProps<SVGSVGElement>;

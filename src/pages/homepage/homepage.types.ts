import { alertProps } from "../../libs/constants/constants";

export type homepageProps = {
  alerts: ({ type, content }: alertProps) => void;
};

import { alertProps } from "../../constants/constants";

export type postFormProps = {
  alerts: ({ type, content }: alertProps) => void;
  disabled?: boolean;
};

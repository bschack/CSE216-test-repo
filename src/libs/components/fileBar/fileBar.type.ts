import { fileProps } from "../../constants/types";

export type fileBarProps = {
  id: number;
  files?: fileProps[];
  isMe: boolean;
  post?: boolean;
};

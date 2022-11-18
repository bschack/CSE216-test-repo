import { fileProps } from "../../constants/types";

export type fileBarProps = {
  postId: number;
  files?: fileProps[];
  isMe: boolean;
};

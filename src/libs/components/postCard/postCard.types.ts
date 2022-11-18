import { Key } from "react";
import { fileProps } from "../../constants/types";

export type postCardProps = {
  id: number;
  key?: Key;
  message: string;
  likes: number;
  username?: string;
  title?: string;
  date?: string;
  userId: number;
  dislikes?: number;
  comments?: number;
  vote?: string;
  updated: boolean;
  postPage?: boolean;
  files?: fileProps[];
};

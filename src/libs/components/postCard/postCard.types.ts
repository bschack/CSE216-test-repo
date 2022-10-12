import { Key } from "react";

export type postCardProps = {
  id: number;
  key?: Key;
  message: string;
  likes: number;
  username?: string;
  title?: string;
  date?: Date;
};

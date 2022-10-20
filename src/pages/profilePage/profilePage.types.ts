import { alertProps } from "../../libs/constants/constants";

export type profileProps =
  | {
      uid: number;
      gi: string;
      so: string;
      bio: string;
      email: string;
      username: string;
    }
  | undefined;

export type profilePageProps = {
  uid: number;
  alerts: ({ type, content }: alertProps) => void;
};

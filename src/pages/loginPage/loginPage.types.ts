import { Dispatch } from "react";

export type LoginPageProps = {
  login: Dispatch<React.SetStateAction<string>>;
};

export type googleUserType = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  hd: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
};

export type sessionProps =
  | {
      sessionHash: string;
      status: string;
    }
  | undefined;

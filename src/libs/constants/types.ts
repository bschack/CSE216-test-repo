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

export type postProps = {
  postId: number;
  username: string;
  content: string;
  date: string;
  userId: number;
  likes: number;
  dislikes: number;
  comments: number;
  vote: string;
};

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

export type commentProps = {
  content: string;
  commentId: number;
  postId: number;
  userId: number;
  date: string;
  edited: boolean;
  username: string;
};

export type fileProps = {
  id: string;
  postId: number;
  link: string;
  name: string;
};

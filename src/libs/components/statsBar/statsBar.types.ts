export type statsBarProps = {
  type: "post" | "comment";
  id: number;
  likes?: number;
  dislikes?: number;
  comments?: number;
  liked?: boolean;
  disliked?: boolean;
  commented?: boolean;
};

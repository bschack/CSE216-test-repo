import clsx from "clsx";
import styles from "./postLoader.module.scss";
import { postLoaderProps } from "./postLoader.types";

export const PostLoader = ({ size = "s" }: postLoaderProps) => {
  return (
    <div className={clsx(styles["post-loader"], styles[`post-loader-${size}`])}>
      <div className={styles["post-loader__spinner"]}></div>
      <div className={styles["post-loader__cutout"]}></div>
    </div>
  );
};

import { postLoaderProps } from "./postLoader.types";

import styles from "./postLoader.module.scss";
import clsx from "clsx";

export const PostLoader = ({ size = "s" }: postLoaderProps) => {
  return (
    <div className={clsx(styles["post-loader"], styles[`post-loader-${size}`])}>
      <div className={styles["post-loader__spinner"]}></div>
      <div className={styles["post-loader__cutout"]}></div>
    </div>
  );
};

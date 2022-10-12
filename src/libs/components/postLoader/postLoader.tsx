import styles from "./postLoader.module.scss";

export const PostLoader = () => {
  return (
    <div className={styles["post-loader"]}>
      <div className={styles["post-loader__spinner"]}></div>
      <div className={styles["post-loader__cutout"]}></div>
    </div>
  );
};

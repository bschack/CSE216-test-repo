import styles from "./loadingCard.module.scss";
import clsx from "clsx";

export const LoadingCard = () => {
  return (
    <div className={styles["loading-card__container"]}>
      <div
        className={clsx(
          styles["loading-card__mock-head"],
          styles["loading-card__mock"]
        )}
      />
      <div
        className={clsx(
          styles["loading-card__mock-body"],
          styles["loading-card__mock"]
        )}
      />
      <div
        className={clsx(
          styles["loading-card__mock-foot"],
          styles["loading-card__mock"]
        )}
      />
    </div>
  );
};

import clsx from "clsx";
import styles from "./section.module.scss";
import { sectionProps } from "./section.types";

export const Section = ({
  children,
  space = false,
  posts = false
}: sectionProps) => {
  return (
    <div
      className={clsx(
        styles["section"],
        space ? styles["section-space"] : null
      )}
    >
      <div
        className={clsx(
          styles["section__body"],
          posts ? styles["section__body-posts"] : null
        )}
      >
        {children}
      </div>
    </div>
  );
};

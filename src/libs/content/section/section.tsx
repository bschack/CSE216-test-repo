import { sectionProps } from "./section.types";

import styles from "./section.module.scss";
import clsx from "clsx";

export const Section = ({
  children,
  space = false,
  posts = false,
  className
}: sectionProps) => {
  return (
    <div
      className={clsx(
        styles["section"],
        space ? styles["section-space"] : null,
        className
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

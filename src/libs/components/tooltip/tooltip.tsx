import { tooltipProps } from "./tooltip.types";

import styles from "./tooltip.module.scss";
import clsx from "clsx";

export const Tooltip = ({
  tip,
  direction = "bottom",
  children,
  disabled = false
}: tooltipProps) => {
  return (
    <div className={styles["tooltip"]}>
      {children}

      {!disabled ? (
        <div
          className={clsx(
            styles["tooltip__show"],
            styles[`tooltip__show-${direction}`]
          )}
        >
          {tip}
        </div>
      ) : null}
    </div>
  );
};

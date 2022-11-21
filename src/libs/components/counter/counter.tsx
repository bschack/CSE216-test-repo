import { counterProps } from "./counter.types";

import styles from "./counter.module.scss";
import clsx from "clsx";
import { ActiveBar } from "../activeBar/activeBar";

export const Counter = ({
  length,
  maxLength,
  active,
  duration,
  hideOnInactive,
  barActive
}: counterProps) => {
  const fieldActive = barActive !== undefined ? barActive : active;

  return (
    <div className={styles["counter"]}>
      <span
        className={clsx(
          styles["counter__number"],
          hideOnInactive && !active && styles["counter__number-hidden"]
        )}
      >{`${length}/${maxLength}`}</span>
      <ActiveBar active={fieldActive} duration={duration} />
    </div>
  );
};

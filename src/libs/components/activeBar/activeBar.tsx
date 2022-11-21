import { activeBarProps } from "./activeBar.types";

import styles from "./activeBar.module.scss";
import clsx from "clsx";

export const ActiveBar = ({ active }: activeBarProps) => {
  return (
    <div
      className={clsx(
        styles["active-bar"],
        active && styles["active-bar__active"]
      )}
    >
      <span />
      <span />
    </div>
  );
};

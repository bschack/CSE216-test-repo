import { statsBarProps } from "./statsBar.types";
import styles from "./statsBar.module.scss";
import { UpArrow } from "../../icons/src/upArrowIcon";
import { DownArrow } from "../../icons/src/downArrowIcon";
import { CommentIcon } from "../../icons/src/commentIcon";
import { formatNumber } from "../../utils/formatter";
import clsx from "clsx";

export const StatsBar = ({
  type,
  id,
  likes = 0,
  dislikes = 0,
  comments = 0,
  liked = false,
  disliked = false,
  commented = false
}: statsBarProps) => {
  return (
    <div className={styles["stats-bar__body"]}>
      <div
        className={clsx(
          styles["stats-bar__module"],
          styles["stats-bar__module-like"]
        )}
      >
        <UpArrow
          className={liked ? styles["stats-bar__module-liked"] : undefined}
        />{" "}
        {formatNumber(likes)}
      </div>
      <div
        className={clsx(
          styles["stats-bar__module"],
          styles["stats-bar__module-dislike"]
        )}
      >
        <DownArrow
          className={
            disliked ? styles["stats-bar__module-disliked"] : undefined
          }
        />{" "}
        {formatNumber(dislikes)}
      </div>
      {type === "post" ? (
        <div
          className={clsx(
            styles["stats-bar__module"],
            styles["stats-bar__module-comment"]
          )}
        >
          <CommentIcon
            className={
              commented ? styles["stats-bar__module-commented"] : undefined
            }
          />{" "}
          {formatNumber(comments)}
        </div>
      ) : null}
    </div>
  );
};

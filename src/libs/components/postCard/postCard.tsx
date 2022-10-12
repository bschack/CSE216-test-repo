import { postCardProps } from "./postCard.types";
import { formatDate } from "../../utils/formatter";
import { StatsBar } from "../statsBar/statsBar";
import { testUsers } from "../../constants/constants";
import { MenuIcon } from "../../icons/src/menuIcon";

import styles from "./postCard.module.scss";
//import { useState } from "react";

export const PostCard = ({
  id,
  message,
  likes,
  username,
  date,
  title
}: postCardProps) => {
  const liked = testUsers?.postLikes.some((pId) => pId === id);

  return (
    <div className={styles["post-card__container"]}>
      <div className={styles["post-card__header"]}>
        <div className={styles["post-card__header-username"]}>
          {username ? username : "Anonymous Pumpkin"}
        </div>
        <div className={styles["post-card__menu"]}>
          <MenuIcon />
          <div className={styles["post-card__menu-dropdown"]}>
            <div className={styles["post-card__menu-dropdown-edit"]}>
              Edit Post
            </div>
            <hr />
            <div className={styles["post-card__menu-dropdown-delete"]}>
              Delete Post
            </div>
          </div>
        </div>
      </div>
      {title ? <div className={styles["post-card__title"]}>{title}</div> : null}
      <div className={styles["post-card__content"]}>{message}</div>
      {date ? (
        <div className={styles["post-card__date"]}>{formatDate(date)}</div>
      ) : null}
      <StatsBar type="post" id={id} likes={likes} liked={liked} />
    </div>
  );
};

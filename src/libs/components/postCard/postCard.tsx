import { postCardProps } from "./postCard.types";
import { formatDate } from "../../utils/formatter";
import { StatsBar } from "../statsBar/statsBar";

import styles from "./postCard.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Tooltip } from "../tooltip/tooltip";

export const PostCard = ({
  id,
  message,
  likes,
  dislikes,
  comments,
  username,
  date,
  userId,
  vote,
  updated,
  postPage = false
}: postCardProps) => {
  return (
    <div
      className={clsx(
        styles["post-card__container"],
        postPage ? styles["post-card__container-pp"] : null
      )}
    >
      <div className={styles["post-card__header"]}>
        <Tooltip tip={`View ${username}'s Profile`} direction="top">
          <Link
            to={`/profile/${userId}`}
            className={styles["post-card__header-username"]}
          >
            {username ? username : "Anonymous Pumpkin"}
          </Link>
        </Tooltip>
      </div>
      <div className={styles["post-card__content"]}>{message}</div>
      {date ? (
        <div className={styles["post-card__date"]}>{formatDate(date)}</div>
      ) : null}
      <StatsBar
        postPage={postPage}
        id={id}
        likes={likes}
        dislikes={dislikes}
        comments={comments}
        userId={userId}
        vote={vote}
        updated={updated}
      />
    </div>
  );
};

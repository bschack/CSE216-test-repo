import { EditCommentModal } from "../editCommentModal/editCommentModal";
import { FileBar } from "../fileBar/fileBar";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatter";
import { Tooltip } from "../tooltip/tooltip";
import { commentCardProps } from "./commentCard.types";

import useModal from "../../hooks/useModal";

import styles from "./commentCard.module.scss";
import clsx from "clsx";

export const CommentCard = ({ comment }: commentCardProps) => {
  const { isShowing: editing, toggleModal: toggleEditing } = useModal();
  const uid = parseInt(window.sessionStorage.getItem("uid") || "-1");

  const message = comment?.content;
  const userId = comment?.userId;
  const username = comment?.username;
  const date = comment?.date!;
  const edited = comment?.edited;
  const commentId = comment.commentId;
  const isMe = uid === userId;

  return (
    <div className={clsx(styles["comment-card__container"])}>
      <div className={styles["comment-card__header"]}>
        <Tooltip tip={`View ${username}'s Profile`} direction="top">
          <Link
            to={`/profile/${userId}`}
            className={styles["comment-card__header-username"]}
          >
            {username ? username : "Anonymous Pumpkin"}
          </Link>
        </Tooltip>

        {isMe && (
          <div
            className={clsx(
              styles["comment-card__button-edit"],
              styles["comment-card__button"]
            )}
            onClick={toggleEditing}
          >
            Edit
          </div>
        )}
      </div>

      <div className={styles["comment-card__content"]}>{message}</div>

      <div className={styles["comment-card__date"]}>
        {edited && "Edited • "}
        {formatDate(date)}
      </div>
      <FileBar files={[]} id={commentId} isMe={isMe} />
      <EditCommentModal
        commentId={commentId}
        message={message}
        hide={toggleEditing}
        editing={editing}
      />
    </div>
  );
};

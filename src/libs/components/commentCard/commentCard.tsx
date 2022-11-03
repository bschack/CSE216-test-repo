import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { editComment } from "../../hooks/editComment";
import { formatDate } from "../../utils/formatter";
import { Tooltip } from "../tooltip/tooltip";
import styles from "./commentCard.module.scss";
import { commentCardProps } from "./commentCard.types";

export const CommentCard = ({ comment }: commentCardProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const userId = comment?.userId;
  const username = comment?.username;
  const message = comment?.content;
  const date = comment?.date!;
  const edited = comment?.edited;
  const commentId = comment.commentId;

  const [newMessage, setNewMessage] = useState<string>(message);
  const uid = parseInt(window.sessionStorage.getItem("uid") || "-1");

  const canEdit = !editing && uid === userId;

  const edit = () => {
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setNewMessage("");
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    await editComment(newMessage, commentId)
      .then(() => {
        setEditing(false);
        setNewMessage("");
      })
      .catch((err) => {
        console.warn(err);
      });
  };

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

        {canEdit ? (
          <div
            className={clsx(
              styles["comment-card__button-edit"],
              styles["comment-card__button"]
            )}
            onClick={edit}
          >
            Edit
          </div>
        ) : null}
        {editing ? (
          <div className={styles["comment-card__button-group"]}>
            <div
              className={clsx(
                styles["comment-card__button-cancel"],
                styles["comment-card__button"]
              )}
              onClick={cancelEdit}
            >
              Cancel
            </div>
            <div
              className={clsx(
                styles["comment-card__button-submit"],
                styles["comment-card__button"]
              )}
              onClick={handleSubmit}
            >
              Submit
            </div>
          </div>
        ) : null}
      </div>
      {!editing ? (
        <div className={styles["comment-card__content"]}>{message}</div>
      ) : (
        <>
          <textarea
            name="biography"
            value={newMessage}
            onChange={handleChange}
            placeholder={message}
            maxLength={256}
            className={styles["comment-card__form"]}
          />
          <div
            className={clsx(styles["comment-card__counter"])}
          >{`${newMessage.length}/256`}</div>
        </>
      )}
      <div className={styles["comment-card__date"]}>
        {edited ? "Edited • " : null}
        {formatDate(date)}
      </div>
    </div>
  );
};

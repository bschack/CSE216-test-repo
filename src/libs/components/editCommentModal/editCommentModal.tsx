import { editCommentProps } from "./editCommentModal.types";
import { editComment } from "../../api/editComment";
import { useState } from "react";

import Modal from "../../content/modal/modal";

import styles from "./editCommentModal.module.scss";
import clsx from "clsx";
import { ActiveBar } from "../activeBar/activeBar";

export const EditCommentModal = ({
  commentId,
  message,
  editing,
  hide
}: editCommentProps) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);

  const handleChange = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    await editComment(newMessage, commentId)
      .then(() => {
        hide();
        setNewMessage("");
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <Modal isShowing={editing} hide={hide} title="Edit Comment">
      <textarea
        name="biography"
        value={newMessage}
        onChange={handleChange}
        placeholder={message}
        maxLength={256}
        className={styles["edit-comment__form"]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div className={clsx(styles["edit-comment__counter"])}>
        {`${newMessage.length}/256`}
        <ActiveBar active={focus} />
      </div>
      <div className={styles["edit-comment__button-group"]}>
        <div
          className={clsx(
            styles["edit-comment__button-cancel"],
            styles["edit-comment__button"]
          )}
          onClick={hide}
        >
          Cancel
        </div>
        <div
          className={clsx(
            styles["edit-comment__button-submit"],
            styles["edit-comment__button"]
          )}
          onClick={handleSubmit}
        >
          Submit
        </div>
      </div>
    </Modal>
  );
};

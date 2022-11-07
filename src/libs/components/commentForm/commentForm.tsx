import { useState } from "react";
import { PostLoader } from "../postLoader/postLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { postFormProps } from "./commentForm.types";
import { createNewComment } from "../../hooks/createNewComment";

import styles from "./commentForm.module.scss";
import clsx from "clsx";

export const CommentForm = ({ disabled, postId }: postFormProps) => {
  const [message, setMessage] = useState("");
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleChange = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setMessage(e.target.value);
  };

  const postFailed = () => {
    setFailed(true);
    setTimeout(() => {
      setFailed(false);
    }, 820);
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();

    if (!postCheck) {
      postFailed();
      setLoading(false);
      return;
    }

    await createNewComment(message, postId)
      .then(() => {
        setLoading(false);
        setMessage("");
        setFocus(false);
        // alerts(postSuccessAlert);
      })
      .catch((err) => {
        // alerts(postFailedAlert);
        postFailed();
        console.warn(err);
      });
  };

  const postCheck = message.replace(/\s/g, "").length;

  return (
    <div className={styles["comment-form__container"]}>
      <form onSubmit={handleSubmit} className={styles["comment-form__body"]}>
        <textarea
          name="message"
          onChange={handleChange}
          value={message}
          placeholder="I like your idea!"
          maxLength={256}
          className={clsx(
            styles["comment-form__textbox"],
            focus ? styles["comment-form__textbox-active"] : null
          )}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            if (!message.length) setFocus(false);
          }}
          disabled={loading || disabled}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
          }}
        />
        <div
          className={clsx(
            styles["comment-form__counter"],
            focus ? styles["comment-form__counter-active"] : null
          )}
        >{`${message.length}/256`}</div>
        {!loading ? (
          <div
            className={clsx(
              styles["comment-form__submit"],
              failed ? styles["comment-form__submit-failed"] : null,
              !postCheck ? styles["comment-form__submit-disabled"] : null
            )}
            onClick={(e) => {
              if (postCheck) handleSubmit(e);
            }}
          >
            Comment <FontAwesomeIcon icon={faPaperPlane} />
          </div>
        ) : (
          <PostLoader />
        )}
      </form>
    </div>
  );
};

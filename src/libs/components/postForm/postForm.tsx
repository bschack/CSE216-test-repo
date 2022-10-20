import clsx from "clsx";
import { useState } from "react";
import { postFailedAlert, postSuccessAlert } from "../../constants/constants";
import { createPost } from "../../hooks/createPost";
import { PostLoader } from "../postLoader/postLoader";

import styles from "./postForm.module.scss";
import { postFormProps } from "./postForm.types";

export const PostForm = ({ alerts }: postFormProps) => {
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

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();

    if (!postCheck) {
      postFailed();
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const success = createPost();
      setLoading(false);

      if (success) {
        setMessage("");
        setFocus(false);
        alerts(postSuccessAlert);
      } else {
        alerts(postFailedAlert);
        postFailed();
      }
    }, 1500);
  };

  const postCheck = message.replace(/\s/g, "").length;

  return (
    <div className={styles["post-form__container"]}>
      <form onSubmit={handleSubmit} className={styles["post-form__body"]}>
        <textarea
          name="message"
          onChange={handleChange}
          value={message}
          placeholder="Your message here..."
          maxLength={1024}
          className={clsx(
            styles["post-form__textbox"],
            focus ? styles["post-form__textbox-active"] : null
          )}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            if (!message.length) setFocus(false);
          }}
          disabled={loading}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
          }}
        />
        <div
          className={clsx(
            styles["post-form__counter"],
            focus ? styles["post-form__counter-active"] : null
          )}
        >{`${message.length}/1024`}</div>
        {!loading ? (
          <input
            type="submit"
            value="Post"
            className={clsx(
              styles["post-form__submit"],
              failed ? styles["post-form__submit-failed"] : null
            )}
            disabled={!postCheck}
            onClick={handleSubmit}
          />
        ) : (
          <PostLoader />
        )}
      </form>
    </div>
  );
};

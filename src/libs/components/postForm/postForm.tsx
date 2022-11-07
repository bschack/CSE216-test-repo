import { useState } from "react";
import { postFailedAlert, postSuccessAlert } from "../../constants/constants";
import { createNewPost } from "../../hooks/createNewPost";
import { PostLoader } from "../postLoader/postLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { postFormProps } from "./postForm.types";

import styles from "./postForm.module.scss";
import clsx from "clsx";

export const PostForm = ({ alerts, disabled }: postFormProps) => {
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

    await createNewPost(message)
      .then(() => {
        setLoading(false);
        setMessage("");
        setFocus(false);
        alerts(postSuccessAlert);
      })
      .catch((err) => {
        alerts(postFailedAlert);
        postFailed();
        console.warn(err);
      });
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
          disabled={loading /*|| disabled*/}
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
          <div
            className={clsx(
              styles["post-form__submit"],
              failed ? styles["post-form__submit-failed"] : null,
              !postCheck ? styles["post-form__submit-disabled"] : null
            )}
            onClick={(e) => {
              if (postCheck) handleSubmit(e);
            }}
          >
            Post <FontAwesomeIcon icon={faPaperPlane} />
          </div>
        ) : (
          <PostLoader />
        )}
      </form>
    </div>
  );
};

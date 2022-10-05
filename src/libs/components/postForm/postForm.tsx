import clsx from "clsx";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./postForm.module.scss";

export const PostForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [focus, setFocus] = useState(false);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(message);
    setMessage("");
    setFocus(false);
    navigate("/");
  };

  const postCheck = message.replace(/\s/g, '').length;

  return (
    <div className={styles['post-form__container']}>
      <form onSubmit={handleSubmit} className={styles['post-form__body']}>
        <textarea
          name="message"
          onChange={handleChange}
          value={message}
          placeholder="Your message here..."
          maxLength={1024}
          className={clsx(styles['post-form__textbox'], focus ? styles['post-form__textbox-active'] : null)}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            if (!message.length) setFocus(false)
          }}
        />
        <div className={clsx(styles['post-form__counter'], focus ? styles['post-form__counter-active'] : null) }>{`${message.length}/1024`}</div>
        <input type="submit" value="Post" className={styles['post-form__submit']} disabled={!postCheck} />
      </form>
    </div>
  );
};
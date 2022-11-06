import { useEffect, useState } from "react";
import { changeTheme } from "../../styles/lib/changeTheme";
import styles from "./footer.module.scss";

export const Footer = () => {
  const theme = window.localStorage.getItem("theme")!;
  const [dark, setDark] = useState<boolean>(true);

  const toggleTheme = () => {
    if (dark) {
      changeTheme("light");
      setDark(false);
    } else {
      changeTheme("dark");
      setDark(true);
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, [theme]);

  return (
    <div className={styles["footer__container"]}>
      <div className={styles["footer__info"]}>
        <div className={styles["footer__info-logo"]}>
          <img src="/images/logo.png" alt="Blend Logo" />
          The place to combine ideas
        </div>
        <div className={styles["footer__info-links"]}>
          <input
            type="checkbox"
            className={styles["footer__theme"]}
            checked={!dark}
            onClick={toggleTheme}
          />
        </div>
      </div>
      <hr />
      <div className={styles["footer__rights"]}>
        <div>
          Created by the joint efforts of <span>Ben Schack</span> (for now)
        </div>
        <div>Created for CSE 216 at Lehigh University, 2022</div>
      </div>
    </div>
  );
};

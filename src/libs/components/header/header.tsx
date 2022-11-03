import { useLocation } from "react-router-dom";

import styles from "./header.module.scss";

export const Header = () => {
  const path = useLocation().pathname;
  const home = path === "/home";
  const profile = path.indexOf("/profile") > -1;
  const comments = path.indexOf("/posts") > -1;

  const app = document.getElementById("body-container");

  app?.addEventListener(
    "scroll",
    () => {
      document.body.style.setProperty(
        "--scroll",
        `-${Math.min(app?.scrollTop / 120, 1.5)}s`
      );
    },
    false
  );

  return (
    <header className={styles["header"]}>
      {home ? "Home" : null}
      {profile ? "Profile" : null}
      {comments ? "Comments" : null}
    </header>
  );
};

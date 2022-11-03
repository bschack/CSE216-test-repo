import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import styles from "./navBar.module.scss";

export const NavBar = () => {
  const path = useLocation().pathname;
  const home = path === "/home";
  const profile = path.indexOf("/profile") > -1;
  const comments = path.indexOf("/post") > -1;

  return (
    <div className={styles["navBar"]}>
      <div className={styles["navBar__section"]}>
        <Link to="/home">
          <div className={styles["navBar__logo"]}>
            Blen<div>d</div>
          </div>
        </Link>
      </div>
      <div className={styles["navBar__button-group"]}>
        {comments ? (
          <div
            className={clsx(
              styles["navBar__link-active"],
              styles["navBar__link"]
            )}
          >
            Comments
          </div>
        ) : null}
        <Link
          to="/home"
          className={clsx(
            styles["navBar__link"],
            home ? styles["navBar__link-active"] : null
          )}
        >
          Home
        </Link>
        <Link
          to="/profile"
          className={clsx(
            styles["navBar__link"],
            profile ? styles["navBar__link-active"] : null
          )}
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

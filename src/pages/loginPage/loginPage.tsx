import { useEffect, useState } from "react";
import {
  GOOGLE_CLIENT_ID,
  loginFailedAlert,
  loginSuccessAlert
} from "../../libs/constants/constants";
import { loginUser } from "../../libs/hooks/loginUser";
import { LoginPageProps, sessionProps } from "./loginPage.types";

import styles from "./loginPage.module.scss";
import clsx from "clsx";

export const LoginPage = ({ login, alerts }: LoginPageProps) => {
  const [googleLogin, setGoogleLogin] = useState<boolean>(false);

  const handleCredentialResponse = async (res: any) => {
    const credential = res.credential;
    console.log(credential);

    await loginUser(credential)
      .then((sh: sessionProps) => {
        // console.log(sh);
        if (typeof sh === "object") {
          window.sessionStorage.setItem("shk", sh.sessionHash);
          window.sessionStorage.setItem("uid", `${sh.uid}`);
          login(sh.sessionHash);
          alerts(loginSuccessAlert);
        }
      })
      .catch((err) => {
        console.warn(err);
        alerts(loginFailedAlert);
      });
  };

  useEffect(() => {
    document.title = "Login | BLEND";
    // @ts-ignore: Cannot find name
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    // @ts-ignore: Cannot find name
    google.accounts.id.renderButton(document.getElementById("google-login"), {
      theme: "filled_black",
      size: "large"
    });
    // @ts-ignore: Cannot find name
    // google.accounts.id.prompt();
  });

  return (
    <main className={styles["login-page__container"]}>
      <div className={styles["login-page__logo"]}>Blend</div>
      <div className={styles["login-page__logo"]}>Blend</div>
      <div className={styles["login-page__logo"]}>Blend</div>
      <div className={styles["login-page__button-group"]}>
        <div
          className={styles["login-page__button-hover"]}
          onClick={() => {
            if (!googleLogin) setGoogleLogin(true);
            else setGoogleLogin(false);
          }}
        >
          Login
        </div>
        <div
          id="google-login"
          className={clsx(
            styles["login-page__button-google"],
            googleLogin ? styles["login-page__button-google-active"] : null
          )}
        >
          Hello
        </div>
      </div>
      <div className={styles["lines"]}>
        <div className={styles["line"]}></div>
        <div className={styles["line"]}></div>
        <div className={styles["line"]}></div>
      </div>
    </main>
  );
};

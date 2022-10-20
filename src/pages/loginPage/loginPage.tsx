import { useEffect } from "react";
import {
  GOOGLE_CLIENT_ID,
  loginFailedAlert,
  loginSuccessAlert
} from "../../libs/constants/constants";
import { Section } from "../../libs/content/section/section";
import { loginUser } from "../../libs/hooks/loginUser";
import { LoginPageProps, sessionProps } from "./loginPage.types";

export const LoginPage = ({ login, alerts }: LoginPageProps) => {
  const handleCredentialResponse = async (res: any) => {
    const credential = res.credential;

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
    // @ts-ignore: Cannot find name
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    // @ts-ignore: Cannot find name
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "filled_black",
      size: "large",
      shape: "pill",
      logo_alignment: "left"
    });
    // @ts-ignore: Cannot find name
    google.accounts.id.prompt();
  });

  return (
    <Section space>
      <div id="buttonDiv"></div>
    </Section>
  );
};

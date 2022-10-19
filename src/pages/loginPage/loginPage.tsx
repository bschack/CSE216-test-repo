import { useEffect, useState } from "react";
import {
  alertProps,
  GOOGLE_CLIENT_ID,
  loginFailedAlert
} from "../../libs/constants/constants";
import { Section } from "../../libs/content/section/section";
import { loginUser } from "../../libs/hooks/loginUser";
import { LoginPageProps, sessionProps } from "./loginPage.types";
import { AlertBox } from "../../libs/components/alert/alert";

export const LoginPage = ({ login }: LoginPageProps) => {
  const [alertsList, setAlertsList] = useState<alertProps[]>([]);
  const { addAlert, Alerts } = AlertBox(alertsList, setAlertsList);

  const handleCredentialResponse = async (res: any) => {
    const credential = res.credential;

    await loginUser(credential)
      .then((sh: sessionProps) => {
        // console.log(sh);
        if (typeof sh === "object") {
          window.sessionStorage.setItem("shk", sh.sessionHash);
          login(sh.sessionHash);
        }
      })
      .catch((err) => {
        console.warn(err);
        addAlert(loginFailedAlert);
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
      <Alerts />
    </Section>
  );
};

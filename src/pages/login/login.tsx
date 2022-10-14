import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { GOOGLE_CLIENT_ID } from "../../libs/constants/constants";
import { Section } from "../../libs/content/section/section";
import { LoginPageProps } from "./login.types";
// import { useGoogleLogin } from "react-google-login";

export const LoginPage = ({ login }: LoginPageProps) => {
  const handleCredentialResponse = (res: any) => {
    console.log("Encoded JWT ID token: " + res.credential);
    const userObject = jwtDecode(res.credential);
    console.log(userObject);
    login(userObject);
  };

  useEffect(() => {
    // @ts-ignore: Cannot find name
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });

    // @ts-ignore: Cannot find name
    google.accounts.id.renderButton(document.getElementById("buttonDiv")!, {
      theme: "outline",
      size: "large"
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

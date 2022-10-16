import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GOOGLE_CLIENT_ID } from "../../libs/constants/constants";
import { Section } from "../../libs/content/section/section";
import { loginUser } from "../../libs/hooks/loginUser";
import { LoginPageProps } from "./loginPage.types";
// import jwtDecode from "jwt-decode";
// import { LoginPageProps } from "./login.types";

export const LoginPage = ({ login }: LoginPageProps) => {
  const navigate = useNavigate();
  const handleCredentialResponse = async (res: any) => {
    // console.log("Encoded JWT ID token: " + res.credential);
    const credential = res.credential;
    await loginUser(credential).then(() => {
      login(true);
      navigate("/home");
    });
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

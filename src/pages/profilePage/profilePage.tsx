import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userDNE } from "../../libs/constants/constants";
import { getUser } from "../../libs/hooks/getUser";
import { profilePageProps, profileProps } from "./profilePage.types";

export const ProfilePage = ({ uid, alerts }: profilePageProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<profileProps>();
  const params = useParams();
  const TargetUid = parseInt(params.uid || "-1");

  const refreshUser = async () => {
    await getUser(TargetUid)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.warn(err);
        alerts(userDNE);
        navigate("/profile");
      });
  };

  useEffect(() => {
    if (TargetUid < 0) {
      console.warn("Invalid user id");
      return;
    }
    refreshUser();
  });

  return (
    <div>
      <div>{user?.uid === uid ? "This is my profile" : null}</div>
      {user?.bio}
    </div>
  );
};

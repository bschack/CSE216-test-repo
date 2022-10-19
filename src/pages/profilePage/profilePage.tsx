import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../libs/hooks/getUser";
import { profileProps } from "./profilePage.types";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<profileProps>();
  const params = useParams();
  const uid = parseInt(params.uid || "-1");

  const refreshUser = async () => {
    await getUser(uid)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.warn(err);
        navigate("/profile");
      });
  };

  useEffect(() => {
    if (uid < 0) {
      console.warn("Invalid user id");
      return;
    }
    refreshUser();
  });

  return <div>{user?.bio}</div>;
};

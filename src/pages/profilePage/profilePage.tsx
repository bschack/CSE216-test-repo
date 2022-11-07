import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { genders, orientations, userDNE } from "../../libs/constants/constants";
import { Section } from "../../libs/content/section/section";
import { getUser } from "../../libs/api/getUser";
import { profilePageProps, profileProps } from "./profilePage.types";
import { editProfile } from "../../libs/api/editUser";
import { LoadingCard } from "../../libs/components/loadingCard/loadingCard";
import { Header } from "../../libs/components/header/header";
import { Tooltip } from "../../libs/components/tooltip/tooltip";

import styles from "./profilePage.module.scss";
import clsx from "clsx";

const ProfilePage = ({ uid, addAlerts }: profilePageProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [user, setUser] = useState<profileProps>();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [sexuality, setSexuality] = useState("");
  const [biography, setBiography] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const targetUid = parseInt(params.uid || "-1");
  const isMe = user?.uid === uid;
  const canEdit = user?.uid === uid && !editing;

  const doEdit = () => {
    if (canEdit) {
      setEditing(true);
      setName(user?.username);
      setBiography(user?.bio);
      setGender(user?.gi);
      setSexuality(user?.so);
    }
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const refreshUser = async () => {
    await getUser(targetUid)
      .then((res) => {
        setUser(res);
        setLoaded(true);
      })
      .catch((err) => {
        console.warn(err);
        addAlerts(userDNE);
        navigate("/profile");
      });
  };

  useEffect(() => {
    document.title = `Profile - ${user?.username} | BLEND`;

    if (uid < 0) {
      console.warn("Invalid user id");
    } else {
      if (!loaded) refreshUser();
    }

    const renew = setInterval(async () => await refreshUser(), 8000);
    return () => clearInterval(renew);
  });

  const handleChange = (e: any) => {
    const target = e.target;
    const name = target.name;
    if (name === "username") {
      setName(target.value);
    } else if (name === "biography") {
      setBiography(target.value);
    } else if (name === "gender") {
      setGender(target.value);
    } else if (name === "sexuality") {
      setSexuality(target.value);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await editProfile(gender, sexuality, biography, name, uid).then(() => {
      setEditing(false);
    });
    refreshUser();
  };

  type infoCardProps = {
    title: string;
    children?: ReactNode;
    className?: string;
  };

  const InfoCard = ({ title, children, className }: infoCardProps) => {
    return (
      <label className={clsx(styles["profile__infoCard"], className)}>
        <div className={styles["profile__infoCard-title"]}>{title}</div>
        {children}
      </label>
    );
  };

  return (
    <Section space className={styles["profile__section"]}>
      <Header />
      {!loaded ? (
        <LoadingCard />
      ) : !editing ? (
        <div className={styles["profile__container"]}>
          <div className={styles["profile__actions"]}>
            <div className={styles["profile__username"]}>{user?.username}</div>
            {canEdit ? (
              <div className={styles["profile__button-group"]}>
                <div
                  className={clsx(
                    styles["profile__button-edit"],
                    styles["profile__button"]
                  )}
                  onClick={doEdit}
                >
                  Edit
                </div>
              </div>
            ) : null}
          </div>
          <div className={styles["profile__identity"]}>
            {isMe ? (
              <>
                <InfoCard title="Gender Identity">{user?.gi}</InfoCard>
                <InfoCard title="Sexual Orientation">{user?.so}</InfoCard>
              </>
            ) : null}
            <InfoCard title="Email">{user?.email}</InfoCard>
          </div>
          <InfoCard title="Biography" className={styles["profile__bio"]}>
            {user?.bio}
          </InfoCard>
        </div>
      ) : (
        <form className={styles["profile__container"]}>
          <div className={styles["profile__actions"]}>
            <label className={styles["profile__infoCard"]}>
              <div className={styles["profile__infoCard-title"]}>
                <Tooltip
                  tip="This will be displayed on all your posts"
                  direction="top"
                >
                  Username
                </Tooltip>
              </div>
              <input
                type="text"
                name="username"
                placeholder="Apple Bottom"
                className={styles["profile__form-username"]}
                value={name}
                onChange={handleChange}
                minLength={3}
                maxLength={16}
              />
            </label>
            <label className={styles["profile__infoCard"]}>
              <div className={styles["profile__infoCard-title"]}>
                <Tooltip
                  tip="This will not be visible to other people"
                  direction="top"
                >
                  Gender Identity
                </Tooltip>
              </div>
              <select
                value={gender}
                name="gender"
                onChange={handleChange}
                className={styles["profile__form-drop"]}
              >
                {genders.map((g) => {
                  return <option value={g}>{g}</option>;
                })}
              </select>
            </label>
            <label className={styles["profile__infoCard"]}>
              <div className={styles["profile__infoCard-title"]}>
                <Tooltip
                  tip="This will not be visible to other people"
                  direction="top"
                >
                  Sexual Orientation
                </Tooltip>
              </div>
              <select
                value={sexuality}
                name="sexuality"
                onChange={handleChange}
                className={styles["profile__form-drop"]}
              >
                {orientations.map((o) => {
                  return <option value={o}>{o}</option>;
                })}
              </select>
            </label>
          </div>
          <label
            className={clsx(
              styles["profile__infoCard"],
              styles["profile__main-bio"]
            )}
          >
            <div className={styles["profile__infoCard-title"]}>Biography</div>
            <textarea
              name="biography"
              value={biography}
              onChange={handleChange}
              placeholder="I'm uninteresting"
              maxLength={1024}
              className={styles["profile__form-bio"]}
            />
            <div
              className={styles["profile__counter"]}
            >{`${biography.length}/1024`}</div>
          </label>
          <div className={styles["profile__button-group"]}>
            <div
              className={clsx(
                styles["profile__button-cancel"],
                styles["profile__button"]
              )}
              onClick={cancelEdit}
            >
              Cancel
            </div>
            <div
              className={clsx(
                styles["profile__button-submit"],
                styles["profile__button"]
              )}
              onClick={handleSubmit}
            >
              Submit
            </div>
          </div>
        </form>
      )}
    </Section>
  );
};

export default ProfilePage;

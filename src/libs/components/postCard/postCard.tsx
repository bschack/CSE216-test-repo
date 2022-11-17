import { postCardProps } from "./postCard.types";
import { formatDate } from "../../utils/formatter";
import { StatsBar } from "../statsBar/statsBar";
import { Link } from "react-router-dom";
import { Tooltip } from "../tooltip/tooltip";
import Linkify from "linkify-react";

import styles from "./postCard.module.scss";
import clsx from "clsx";
import useModal from "../../hooks/useModal";
import Modal from "../../content/modal/modal";
import { FileUpload } from "../fileUpload/fileUpload";

export const PostCard = ({
  id,
  message,
  likes,
  dislikes,
  comments,
  username,
  date,
  userId,
  vote,
  updated,
  postPage = false
}: postCardProps) => {
  const { isShowing, toggleModal } = useModal();

  const uid = parseInt(window.sessionStorage.getItem("uid") || "-1");
  const isMe = userId === uid;

  return (
    <div
      className={clsx(
        styles["post-card__container"],
        postPage ? styles["post-card__container-pp"] : null
      )}
    >
      <div className={styles["post-card__header"]}>
        <Tooltip tip={`View ${username}'s Profile`} direction="top">
          <Link
            to={`/profile/${userId}`}
            className={styles["post-card__header-username"]}
          >
            {username ? username : "Anonymous Pumpkin"}
          </Link>
        </Tooltip>
      </div>
      <Linkify options={{ target: "_blank" }}>
        <div className={styles["post-card__content"]}>{message}</div>
      </Linkify>
      {date ? (
        <div className={styles["post-card__date"]}>{formatDate(date)}</div>
      ) : null}
      {isMe ? <div onClick={toggleModal}>+</div> : null}
      <StatsBar
        postPage={postPage}
        id={id}
        likes={likes}
        dislikes={dislikes}
        comments={comments}
        userId={userId}
        vote={vote}
        updated={updated}
      />
      <Modal isShowing={isShowing} hide={toggleModal}>
        <FileUpload closeModal={toggleModal} />
      </Modal>
    </div>
  );
};

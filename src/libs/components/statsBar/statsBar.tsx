import { statsBarProps } from "./statsBar.types";
import styles from "./statsBar.module.scss";
import { formatNumber } from "../../utils/formatter";
import clsx from "clsx";
import { userVote } from "../../hooks/userVote";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faComment
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Tooltip } from "../tooltip/tooltip";

export const StatsBar = ({
  postPage,
  id,
  likes = 0,
  dislikes = 0,
  comments = 0,
  vote = "",
  updated
}: statsBarProps) => {
  const [myVote, setMyVote] = useState(vote);
  const [addLike, setAddLike] = useState(0);
  const [addDislike, setAddDislike] = useState(0);
  const [exploded, setExploded] = useState<boolean>(false);

  const commented = comments > 0;

  const explode = () => {
    setExploded(true);
    setTimeout(() => {
      setExploded(false);
    }, 2000);
  };

  useEffect(() => {
    if (updated) {
      setAddLike(0);
      setAddDislike(0);
      setMyVote(vote);
    }
  }, [updated, vote]);

  const like = async () => {
    if (myVote === "") {
      setMyVote("like");
      setAddLike(1);
      explode();
    } else if (myVote === "dislike") {
      setMyVote("like");
      setAddLike(1);
      setAddDislike(-1);
      explode();
    } else {
      setMyVote("");
      setAddLike(-1);
    }
    userVote({ pid: id, type: "like" });
  };

  const dislike = async () => {
    if (myVote === "") {
      setMyVote("dislike");
      setAddDislike(1);
    } else if (myVote === "like") {
      setMyVote("dislike");
      setAddLike(-1);
      setAddDislike(1);
    } else {
      setMyVote("");
      setAddDislike(-1);
    }
    userVote({ pid: id, type: "dislike" });
  };

  const n = 30;
  let parts: number[] = [];
  Array(n)
    .fill(0)
    .map((_, i) => parts.push(i));

  return (
    <div className={styles["stats-bar__body"]}>
      <Tooltip tip={vote === "like" ? "Remove Like" : "Like"}>
        <div
          className={clsx(
            styles["stats-bar__module"],
            styles["stats-bar__module-like"],
            myVote === "like" ? styles["stats-bar__module-liked"] : undefined
          )}
          onClick={like}
        >
          <FontAwesomeIcon icon={faArrowUp} />
          {formatNumber(likes + addLike)}
          {exploded ? (
            <div className={styles["explosion"]}>
              {parts.map((i) => (
                <div className={styles["particle"]} key={i} />
              ))}
            </div>
          ) : null}
        </div>
      </Tooltip>
      <Tooltip tip={vote === "dislike" ? "Remove Dislike" : "Dislike"}>
        <div
          className={clsx(
            styles["stats-bar__module"],
            styles["stats-bar__module-dislike"],
            myVote === "dislike"
              ? styles["stats-bar__module-disliked"]
              : undefined
          )}
          onClick={dislike}
        >
          <FontAwesomeIcon icon={faArrowDown} />{" "}
          {formatNumber(dislikes + addDislike)}
        </div>
      </Tooltip>
      {!postPage ? (
        <Link to={`/post/${id}`}>
          <Tooltip tip="View Comments">
            <div
              className={clsx(
                styles["stats-bar__module"],
                styles["stats-bar__module-comment"],
                commented ? styles["stats-bar__module-commented"] : null
              )}
            >
              <FontAwesomeIcon icon={faComment} /> {formatNumber(comments)}
            </div>
          </Tooltip>
        </Link>
      ) : null}
    </div>
  );
};

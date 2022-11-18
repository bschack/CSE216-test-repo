import Modal from "../../content/modal/modal";
import useModal from "../../hooks/useModal";
import { FileUpload } from "../fileUpload/fileUpload";
import { fileBarProps } from "./fileBar.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "../tooltip/tooltip";
import { useState } from "react";
import { FileEdit } from "../fileEdit/fileEdit";

import styles from "./fileBar.module.scss";

export const FileBar = ({ files = [], isMe, postId }: fileBarProps) => {
  const { isShowing: upModalShow, toggleModal: upModalToggle } = useModal();
  const { isShowing: editModalShow, toggleModal: editModalToggle } = useModal();
  const { toggleModal: fileModalToggle } = useModal();
  const [shown, setShown] = useState<number>();
  const [name, setName] = useState<string>("");

  return (
    <div className={styles["file-bar"]}>
      {isMe ? (
        <Tooltip tip="Add File">
          <div onClick={upModalToggle} className={styles["file-bar__add"]}>
            <FontAwesomeIcon icon={faPlus} height="13px" width="13px" />
          </div>
        </Tooltip>
      ) : null}
      {files.length > 0 ? (
        <div className={styles["file-bar__attachments"]}>
          {files?.map(({ name, base64 }, i) => {
            const displayName =
              name.length > 10 ? `${name.substring(0, 7)}...` : name;
            return (
              <Tooltip tip={name} key={i}>
                <div
                  className={styles["file-bar__pill"]}
                  onClick={() => {
                    setShown(i);
                    fileModalToggle();
                  }}
                >
                  <div>{displayName}</div>
                  {isMe ? (
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      onClick={(e) => {
                        e.stopPropagation();
                        setName(name);
                        editModalToggle();
                      }}
                      className={styles["file-bar__pill-menu"]}
                    />
                  ) : null}
                </div>
                <Modal
                  isShowing={shown === i}
                  hide={() => {
                    fileModalToggle();
                    setShown(undefined);
                  }}
                >
                  <div className={styles["file-bar__attachments-modal"]}>
                    {name}
                    <img
                      src={base64}
                      alt="Attachment"
                      className={styles["file-bar__attachments-image"]}
                    />
                  </div>
                </Modal>
              </Tooltip>
            );
          })}
        </div>
      ) : null}
      <Modal isShowing={upModalShow} hide={upModalToggle}>
        <FileUpload closeModal={upModalToggle} postId={postId} />
      </Modal>
      <Modal isShowing={editModalShow} hide={editModalToggle}>
        <FileEdit name={name} closeModal={editModalToggle} />
      </Modal>
    </div>
  );
};

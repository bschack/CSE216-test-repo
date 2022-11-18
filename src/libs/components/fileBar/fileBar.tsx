import { FileUpload } from "../fileUpload/fileUpload";
import { fileBarProps } from "./fileBar.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "../tooltip/tooltip";
import { useState } from "react";
import { FileEdit } from "../fileEdit/fileEdit";
import { fileProps } from "../../constants/types";

import Modal from "../../content/modal/modal";
import useModal from "../../hooks/useModal";
import styles from "./fileBar.module.scss";

export const FileBar = ({ files = [], isMe, postId }: fileBarProps) => {
  const { isShowing: upModalShow, toggleModal: upModalToggle } = useModal();
  const { isShowing: editModalShow, toggleModal: editModalToggle } = useModal();
  const [file, setFile] = useState<fileProps>();

  return (
    <div className={styles["file-bar"]}>
      {isMe ? (
        <Tooltip tip="Add File">
          <div onClick={upModalToggle} className={styles["file-bar__add"]}>
            <FontAwesomeIcon icon={faPlus} height="15px" width="15px" />
          </div>
        </Tooltip>
      ) : null}
      {files.length > 0 ? (
        <div className={styles["file-bar__attachments"]}>
          {files?.map((file, i) => {
            const { name, link } = file;
            const displayName =
              name.length > 10 ? `${name.substring(0, 7).trim()}...` : name;
            return (
              <Tooltip tip={name} key={i}>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles["file-bar__pill"]}
                >
                  <div>{displayName}</div>
                  {isMe ? (
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setFile(file);
                        editModalToggle();
                      }}
                      className={styles["file-bar__pill-menu"]}
                    />
                  ) : null}
                </a>
              </Tooltip>
            );
          })}
        </div>
      ) : null}
      <Modal isShowing={upModalShow} hide={upModalToggle}>
        <FileUpload closeModal={upModalToggle} postId={postId} />
      </Modal>
      <Modal isShowing={editModalShow} hide={editModalToggle}>
        <FileEdit file={file!} closeModal={editModalToggle} />
      </Modal>
    </div>
  );
};

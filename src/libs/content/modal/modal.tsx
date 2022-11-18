import { modalProps } from "./modal.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

import ReactDOM from "react-dom";
import styles from "./modal.module.scss";

const Modal = ({ children, isShowing, hide }: modalProps) =>
  isShowing
    ? ReactDOM.createPortal(
        <div className={styles["modal"]}>
          <div className={styles["modal__body"]}>
            <div className={styles["modal__body-close"]}>
              <FontAwesomeIcon icon={faCircleXmark} onClick={hide} />
            </div>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;

export default Modal;

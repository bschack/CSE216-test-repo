import { modalProps } from "./modal.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

import ReactDOM from "react-dom";
import styles from "./modal.module.scss";

const Modal = ({ title, children, isShowing, hide }: modalProps) =>
  isShowing
    ? ReactDOM.createPortal(
        <div className={styles["modal"]}>
          <div className={styles["modal__body"]}>
            <div className={styles["modal__body-close"]}>
              <FontAwesomeIcon icon={faCircleXmark} onClick={hide} />
            </div>
            {title && <h4 className={styles["modal__title"]}>{title}</h4>}
            {children}
          </div>
        </div>,
        document.body
      )
    : null;

export default Modal;

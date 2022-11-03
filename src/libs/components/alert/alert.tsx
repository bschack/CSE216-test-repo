import { alertProps } from "./alert.types";

import styles from "./alert.module.scss";
import clsx from "clsx";
import { SetStateAction, useState } from "react";

const Alert = ({ type, content }: alertProps) => {
  const [show, setShow] = useState<boolean>(true);
  const alertType = type.toLowerCase();

  setTimeout(() => setShow(false), 6000);

  return (
    <div
      className={clsx(
        styles[`alert__body-${alertType}`],
        styles["alert__body"],
        !show ? styles["alert__body-hide"] : null
      )}
    >
      <div className={styles["alert__type"]}>{type}</div>
      <div className={styles["alert__contents"]}>{content}</div>
    </div>
  );
};

export const AlertBox = (
  alerts: alertProps[] = [],
  setAlerts: React.Dispatch<SetStateAction<alertProps[]>>
) => {
  const aList = alerts;
  const addAlert = ({ type, content }: alertProps) => {
    const alert = {
      type: type,
      content: content
    };
    if (aList.length > 2) {
      aList.shift();
    }
    aList.push(alert);
    setAlerts(aList);
  };

  const Alerts = () =>
    alerts.length > 0 ? (
      <div className={styles["alert__container"]}>
        {alerts.map((alert: alertProps) => {
          return (
            <Alert
              key={alerts.indexOf(alert)}
              type={alert.type}
              content={alert.content}
            />
          );
        })}
      </div>
    ) : null;

  return { addAlert, Alerts };
};

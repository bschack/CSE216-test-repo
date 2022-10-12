import { alertProps } from "./alert.types";

import styles from "./alert.module.scss";
import clsx from "clsx";
import { SetStateAction } from "react";

const Alert = ({ type, content }: alertProps) => {
  const alertType = type.toLowerCase();

  return (
    <div
      className={clsx(
        styles[`alert__body-${alertType}`],
        styles["alert__body"]
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
    if (alerts.length > 2) {
      aList.shift();
    }
    aList.push(alert);
    setAlerts(aList);
    setTimeout(() => {
      aList.shift();
      setAlerts(aList);
    }, 6000);
  };

  const Alerts = () => (
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
  );

  return { addAlert, Alerts };
};

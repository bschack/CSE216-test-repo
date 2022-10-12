import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <div className={styles["footer__container"]}>
      <div className={styles["footer__info"]}>
        <div className={styles["footer__info-logo"]}>
          <img src="/images/logo.png" alt="Blend Logo" />
          The place to combine ideas
        </div>
        <div className={styles["footer__info-links"]}></div>
      </div>
      <hr />
      <div className={styles["footer__rights"]}>
        <div>
          Created by the joint efforts of <span>Ben Schack</span> (for now)
        </div>
        <div>Created for CSE 216 at Lehigh University, 2022</div>
      </div>
    </div>
  );
};

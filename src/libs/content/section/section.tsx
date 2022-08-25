import styles from './section.module.scss';
import { sectionProps } from './section.types';

export const Section = ({ children }: sectionProps) => {
  return (
    <div className={styles['section']}>
      <div className={styles['section__spacer']} />
      <div className={styles['section__container']}>
        {children}
      </div>
    </div>
  );
};
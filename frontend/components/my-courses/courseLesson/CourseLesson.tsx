import React from 'react';
import styles from './CourseLesson.module.scss';
import { InsertDriveFile } from '@mui/icons-material';

type Props = {
  name: string;
  description: string;
  date: Date;
};

export const CourseLesson: React.FC<Props> = ({ name, description, date }) => {
  return (
    <div className={styles.courseLesson}>
      <div className={styles.decor}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.textIcon}>
          <InsertDriveFile /> <span>File 1</span>
        </div>
        <div className={styles.textIcon}>
          <InsertDriveFile /> <span>File 2</span>
        </div>
        <div className={styles.date}>{date.toLocaleDateString()}</div>
      </div>
    </div>
  );
};

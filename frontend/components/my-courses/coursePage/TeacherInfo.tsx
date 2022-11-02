import React from 'react';
import styles from './CoursePage.module.scss';
import { Mail } from '@mui/icons-material';
import { Course } from '../../../models/types';

type Props = {
  course: Course;
};

export const TeacherInfo: React.FC<Props> = ({ course }) => {
  const { name, teacherImg, teacherName } = course;

  return (
    <div className={styles.info}>
      <img className={styles.teacherImage} src={teacherImg} alt={name} />
      <div className={styles.teacherName}>{teacherName}</div>

      <div className={styles.teacherInfo}>
        <div className={styles.textIcon}>
          <img src='/icons/linkedin.svg' alt={'linkedin'} />
          <span>LinkedIn</span>
        </div>

        <div className={styles.textIcon}>
          <Mail color='primary' />
          <span>teacher@mail.com</span>
        </div>
      </div>
    </div>
  );
};

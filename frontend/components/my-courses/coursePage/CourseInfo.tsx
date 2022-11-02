import React from 'react';
import { Course } from '../../../models/types';
import styles from './CoursePage.module.scss';
import { Star, ExitToApp, Add } from '@mui/icons-material';
import { Button } from '@mui/material';

type Props = {
  course: Course;
  onCourseAdd: () => void;
};

export const CourseInfo: React.FC<Props> = ({ course: { name, description }, onCourseAdd }) => {
  return (
    <div className={styles.courseInfo}>
      <div className={styles.header}>
        <div className={styles.name}>{name}</div>
        <Button variant='outlined' color='secondary'>
          <ExitToApp /> {'Leave'}
        </Button>
      </div>
      <div className={styles.description}>{description}</div>

      <div className={styles.textIcon}>
        <Star color='primary' />
        <span>{'My Grades'}</span>
      </div>

      <div className={styles.textIcon}>
        <Add color='primary' />
        <span onClick={onCourseAdd}>{'Add'}</span>
      </div>
    </div>
  );
};

import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { Course } from '../../../models/types';
import styles from './CourseCard.module.scss';

export const COURSE_DEFAULT_COVER_IMAGE = '/images/course-cover-image.jpg';

type Props = {
  course: Course;
};

const CourseCard: React.FC<Props> = ({
  course: { id, teacherImg, coverImg, name, description }
}) => {
  const router = useRouter();

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardImage}>
        <img src={coverImg || COURSE_DEFAULT_COVER_IMAGE} alt={description} />
      </div>
      <div className={styles.cardTeacherPhoto}>
        <img src={teacherImg} alt={name} />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardContentTitle}>{name}</div>
        <div className={styles.cardContentDescription}>{description}</div>
      </div>
      <div className={styles.cardButtonContainer}>
        <Button variant='outlined' color='primary' onClick={() => router.push(`/myCourses/${id}`)}>
          Enter
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;

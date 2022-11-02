import React from 'react';
import styles from '../../styles/modules/MyCourses.module.scss';
import { Favorite } from '@mui/icons-material';
import { CourseFilter } from './CourseFilter';

type Props = {
  onSearchInputChange: (val: string) => void;
  searchValue: string;
};

export const MyCoursesHeader: React.FC<Props> = ({ onSearchInputChange, searchValue }) => {
  return (
    <div className={styles.myCoursesHeader}>
      <div className={styles.myCoursesHeaderLeftWrapper}>
        <Favorite />
        <span>My Courses</span>
      </div>
      <CourseFilter onSearchInputChange={onSearchInputChange} searchValue={searchValue} />
    </div>
  );
};

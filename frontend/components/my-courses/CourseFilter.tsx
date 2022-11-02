import React from 'react';
import { TextField, IconButton } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import styles from '../../styles/modules/MyCourses.module.scss';

type Props = {
  onSearchInputChange: (val: string) => void;
  searchValue: string;
};

export const CourseFilter: React.FC<Props> = ({ searchValue, onSearchInputChange }) => {
  return (
    <div className={styles.myCoursesHeaderRightWrapper}>
      <TextField
        size='small'
        label={('courses:searchCourse')}
        onChange={(e) => onSearchInputChange(e.target.value)}
        value={searchValue}
      />
      <IconButton>
        <FilterList />
      </IconButton>
    </div>
  );
};

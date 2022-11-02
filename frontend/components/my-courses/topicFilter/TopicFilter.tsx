import React from 'react';
import { TextField } from '@mui/material';
import styles from './TopicFilter.module.scss';
import { useWindowSize } from '../../../hooks/useWindowResize';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export const TopicFilter: React.FC<Props> = ({ value, onChange }) => {
  const [width] = useWindowSize();

  return (
    <div className={styles.searchFieldWrapper}>
      <div className={styles.field}>
        <TextField
          label={('courses:findTopic')}
          fullWidth={width < 768}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

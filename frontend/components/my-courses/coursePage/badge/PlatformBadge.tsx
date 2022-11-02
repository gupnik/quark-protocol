import { Avatar, Chip } from '@mui/material';
import React from 'react';
import { LessonPlatform } from '../../../../models/enums';
import styles from '../editor/CourseEditor.module.scss';
import { Done } from '@mui/icons-material';

type Props = {
  selectedPlatform: LessonPlatform;
  label: string;
  isActive: boolean;
  onClick: (platform: LessonPlatform) => void;
};

export const PlatformBadge: React.FC<Props> = ({ selectedPlatform, isActive, label, onClick }) => {
  return (
    <div>
      <Chip
        className={styles.chip}
        avatar={<Avatar>{label.toUpperCase().charAt(0)}</Avatar>}
        label={label}
        color={isActive ? 'primary' : 'default'}
        onClick={() => onClick(selectedPlatform)}
        onDelete={() => {}}
        deleteIcon={isActive ? <Done /> : <></>}
      />
    </div>
  );
};

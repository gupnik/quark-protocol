import React from 'react';
import styles from '../CourseEditor.module.scss';
import { PlatformBadge } from '../../badge/PlatformBadge';
import { LessonPlatform } from '../../../../../models/enums';

type Props = {
  setSelectedPlatform: (platform: LessonPlatform) => void;
  selectedPlatform: LessonPlatform;
};

export const ContactEditor: React.FC<Props> = ({ selectedPlatform, setSelectedPlatform }) => {
  return (
    <div className={styles.chipContainer}>
      <PlatformBadge
        isActive={selectedPlatform === LessonPlatform.ZOOM}
        label='Zoom'
        selectedPlatform={selectedPlatform}
        onClick={() => setSelectedPlatform(LessonPlatform.ZOOM)}
      />
      <PlatformBadge
        isActive={selectedPlatform === LessonPlatform.TEAMS}
        label='Teams'
        selectedPlatform={selectedPlatform}
        onClick={() => setSelectedPlatform(LessonPlatform.TEAMS)}
      />
      <PlatformBadge
        isActive={selectedPlatform === LessonPlatform.SKYPE}
        label='Skype'
        selectedPlatform={selectedPlatform}
        onClick={() => setSelectedPlatform(LessonPlatform.SKYPE)}
      />
      <PlatformBadge
        isActive={selectedPlatform === LessonPlatform.DISCORD}
        label='Discord'
        selectedPlatform={selectedPlatform}
        onClick={() => setSelectedPlatform(LessonPlatform.DISCORD)}
      />
      <PlatformBadge
        isActive={selectedPlatform === LessonPlatform.OTHER}
        label='Other'
        selectedPlatform={selectedPlatform}
        onClick={() => setSelectedPlatform(LessonPlatform.OTHER)}
      />
    </div>
  );
};

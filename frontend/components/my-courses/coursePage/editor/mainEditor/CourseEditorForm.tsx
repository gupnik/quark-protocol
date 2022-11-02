import { TextField, Button } from '@mui/material';
import React from 'react';
import styles from '../CourseEditor.module.scss';
import { DatePicker, TimePicker } from '@mui/lab';
import { LessonCreationFormValues } from '../../../../../models/types';
import { useWindowSize } from '../../../../../hooks/useWindowResize';

type Props = {
  onSubmit: () => void;
  onChange: (name: keyof LessonCreationFormValues, value: string | Date) => void;
  values: LessonCreationFormValues;
};

export const CourseEditorForm: React.FC<Props> = ({ onSubmit, onChange, values }) => {
  const [width] = useWindowSize();
  const { startDate, endDate, subject, description, startTime, endTime } = values;

  return (
    <div>
      <div className={styles.sectionTitle}>{('courses:informationLabel')}</div>
      <div>
        <TextField
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            onChange('subject', e.target.value)
          }
          inputProps={{
            'data-testid': 'subject-field'
          }}
          value={subject}
          name='subject'
          helperText={('courses:editor.subjectHelperText')}
          fullWidth
          variant='outlined'
          label={('courses:editor.subjectLabel')}
          required
        />
      </div>

      <div className={styles.dateTimeRow}>
        <DatePicker
          inputProps={{
            'data-testid': 'start-date-field'
          }}
          value={startDate}
          onChange={(date) => onChange('startDate', date)}
          name='startDate'
          fullWidth={width < 1200}
          helperText={('courses:editor.startDateLabel')}
          inputVariant='outlined'
        />
        <TimePicker
          inputProps={{
            'data-testid': 'start-time-field'
          }}
          value={startTime}
          onChange={(time) => onChange('startTime', time)}
          name='startTime'
          fullWidth={width < 1200}
          helperText={('courses:editor.startTimeLabel')}
          className={styles.timepicker}
          inputVariant='outlined'
        />
      </div>

      <div className={styles.dateTimeRow}>
        <DatePicker
          inputProps={{
            'data-testid': 'end-date-field'
          }}
          onChange={(date) => onChange('endDate', date)}
          value={endDate}
          name='endDate'
          fullWidth={width < 1200}
          inputVariant='outlined'
          helperText={('courses:editor.endDateLabel')}
        />
        <TimePicker
          inputProps={{
            'data-testid': 'end-time-field'
          }}
          value={endTime}
          onChange={(time) => onChange('endTime', time)}
          name='endTime'
          fullWidth={width < 1200}
          inputVariant='outlined'
          helperText={('courses:editor.endTimeLabel')}
          className={styles.timepicker}
        />
      </div>

      <div>
        <TextField
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            onChange('description', e.target.value)
          }
          inputProps={{
            'data-testid': 'description-field'
          }}
          name='description'
          helperText={('courses:editor.descriptionHelperText')}
          fullWidth
          variant='outlined'
          rows={4}
          multiline
          value={description}
          label={('courses:editor.descriptionLabel')}
        />
      </div>
      {width > 768 && (
        <Button
          type='submit'
          data-testid='course-submit'
          fullWidth
          className={styles.addButton}
          onClick={onSubmit}
          color='primary'
          variant='contained'
        >
          {('courses:submitButtonLabel')}
        </Button>
      )}
    </div>
  );
};

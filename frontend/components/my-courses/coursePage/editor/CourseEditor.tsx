import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './CourseEditor.module.scss';
import DateFnsUtils from '@date-io/date-fns';
import { CourseEditorForm } from './mainEditor/CourseEditorForm';
import { ContactEditor } from './contactEditor/ContactEditor';
import { FileEditor } from './fileEditor/FileEditor';
import { useSnackbar } from 'notistack';
import { ConfirmationDialog } from './dialog/ConfirmationDialog';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useWindowSize } from '../../../../hooks/useWindowResize';
import { LessonPlatform } from '../../../../models/enums';
import { LessonCreationFormValues } from '../../../../models/types';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export const MAXIMUM_LESSON_FILES = 3;
export const MAXIMUM_LESSON_FILE_SIZE = 5242880;

export const CourseEditor: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<LessonPlatform>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [width] = useWindowSize();
  const { enqueueSnackbar } = useSnackbar();

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    executeRecaptcha && executeRecaptcha('course_edit_entrance');
  }, []);

  const [lessonInfoForm, setLessonInfoForm] = useState<LessonCreationFormValues>({
    endDate: new Date(),
    endTime: new Date(),
    startDate: new Date(),
    startTime: new Date(),
    subject: '',
    description: ''
  });

  const onLessonInfoFormChange = (name: keyof LessonCreationFormValues, value: string | Date) => {
    setLessonInfoForm({ ...lessonInfoForm, [name]: value });
  };

  const isFileSizeValid = (file: File) => file.size <= MAXIMUM_LESSON_FILE_SIZE;

  const isFileAmountReached = () => selectedFiles.length >= MAXIMUM_LESSON_FILES;

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!isFileSizeValid(file)) {
      enqueueSnackbar(('courses:errorMessages.fileIsTooBig'), { variant: 'error' });
      return;
    }

    if (isFileAmountReached()) {
      enqueueSnackbar(('courses:errorMessages.maximumAmountReached'), { variant: 'error' });
      return;
    }

    setSelectedFiles([...selectedFiles, file]);
  };

  const onFileRemove = (file: File) => {
    setSelectedFiles(selectedFiles.filter((f) => f !== file));
  };

  const onSubmit = () => {
    const { subject } = lessonInfoForm;

    if (!subject) {
      enqueueSnackbar(('courses:errorMessages.fillRequiredFields'), { variant: 'error' });
      return;
    }

    if (!selectedPlatform) {
      setConfirmationDialogOpen(true);
    }

    executeRecaptcha && executeRecaptcha('course_edit_creation');
    // TODO: Backend call
  };

  return (
    <div>
      <div className={styles.title}>{('courses:addLessonTitle')}</div>
      <div className={styles.editorContainer}>
        <ConfirmationDialog
          open={confirmationDialogOpen}
          message={('courses:errorMessages.platformNotSelected')}
          onCancel={() => setConfirmationDialogOpen(false)}
          onSubmit={() => {}}
        />
        <CourseEditorForm
          onSubmit={onSubmit}
          onChange={onLessonInfoFormChange}
          values={lessonInfoForm}
        />
        <div className={styles.platformContainer}>
          <div className={styles.sectionTitle}>{('courses:whereTitle')}</div>
          <ContactEditor
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
          />

          {selectedPlatform && (
            <div className={styles.selectedPlatform}>
              <TextField fullWidth variant='outlined' label={('courses:specifyLink')} />
            </div>
          )}

          <FileEditor
            selectedFiles={selectedFiles}
            onFileRemove={onFileRemove}
            onFileSelect={onFileSelect}
          />
        </div>

        {width <= 768 && (
          <Button
            data-testid='course-submit'
            fullWidth
            className={styles.addButton}
            color='primary'
            variant='contained'
          >
            {('courses:submitButtonLabel')}
          </Button>
        )}
      </div>
    </div>
  );
};

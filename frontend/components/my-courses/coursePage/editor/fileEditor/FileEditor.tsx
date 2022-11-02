import React from 'react';
import styles from '../CourseEditor.module.scss';
import { InsertDriveFile, Clear, Add } from '@mui/icons-material';
import { Button } from '@mui/material';

type Props = {
  selectedFiles: File[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: (e: File) => void;
};

export const FileEditor: React.FC<Props> = ({ selectedFiles, onFileSelect, onFileRemove }) => {
  return (
    <div className={styles.attachementsContainer}>
      <div className={styles.sectionTitle}>{('courses:attachFilesLabel')}</div>
      {selectedFiles.length !== 0 &&
        selectedFiles.map((file, idx) => {
          return (
            <div key={idx} className={styles.singleFileContainer}>
              <InsertDriveFile color='primary' />
              <span>{file.name}</span>
              <Clear
                onClick={() => onFileRemove(file)}
                className={styles.deleteIcon}
                color='secondary'
                fontSize='small'
              />
            </div>
          );
        })}
      <input
        color='primary'
        type='file'
        id='icon-button-file'
        onChange={(e) => onFileSelect(e)}
        style={{ display: 'none' }}
      />
      <label htmlFor='icon-button-file'>
        <Button
          className={styles.addFileButton}
          component='span'
          startIcon={<Add />}
          size='large'
          color='primary'
        >
          {('courses:addFileLabel')}
        </Button>
      </label>
    </div>
  );
};

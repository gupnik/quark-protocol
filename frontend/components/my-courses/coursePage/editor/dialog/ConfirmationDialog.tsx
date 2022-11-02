import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type Props = {
  message: string;
  onSubmit: () => void;
  onCancel: () => void;
  open: boolean;
};

export const ConfirmationDialog: React.FC<Props> = ({ open, message, onSubmit, onCancel }) => {
  return (
    <div data-testid='confirmation-dialog'>
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{('courses:confirmationDialogTitle')}</DialogTitle>
        <DialogContent data-testid='confirmation-dialog-content'>
          <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color='secondary' variant='outlined'>
            {('courses:cancel')}
          </Button>
          <Button onClick={onSubmit} color='primary' variant='outlined'>
            {('courses:continue')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

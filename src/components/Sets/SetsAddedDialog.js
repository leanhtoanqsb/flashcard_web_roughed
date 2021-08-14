import React from 'react';
import { Link } from 'react-router-dom';

/*import { makeStyles } from '@material-ui/core/styles';*/
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

export default function SetsAddedDialog({ open, handleClose, folderId }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogActions>
        <Button
          size='large'
          component={Link}
          to={
            folderId ? `/create-set?folderId=${folderId}`: '/create-set'
          }
          color="primary"
        >
        <Typography variant='h4'>
          CREATE NEW SET
        </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

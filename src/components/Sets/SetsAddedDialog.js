import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '',
  },
  title: {
    background: theme.customColor.background.primary,
    '& *': {
      color: 'white',
    }
  },
  action: {
    background: theme.customColor.background.gray,
    padding: theme.spacing(2),
  },
}));

export default function SetsAddedDialog({ open, handleClose, folderId }) {
  const classes = useStyles()
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle
        className={classes.title}
      >
        <Typography variant='h4'>
          Add a set
        </Typography>
      </DialogTitle>
      <DialogActions
        className={classes.action}
      >
        <Button
          size='large'
          component={Link}
          to={
            folderId ? `/create-set?folderId=${folderId}`: '/create-set'
          }
          color="primary"
        >
        <Typography variant='h5'>
          CREATE NEW SET
        </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

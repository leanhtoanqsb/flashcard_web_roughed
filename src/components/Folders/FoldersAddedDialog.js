import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addFolders } from 'modules/folders/foldersSlice';
import debounce from 'lodash/debounce';
import ResponsiveDialog from 'components/Dialog/ResponsiveDialog';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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
  content: {
    paddingTop: theme.spacing(2),
  },
}));

export default function FoldersAddedForm({ open, handleClose }) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch()
  const [folderName, setFolderName] = useState('')
  const handleFolderNameChange = debounce((value) => {
    setFolderName(value)
  }, 100)
  return (
    <ResponsiveDialog open={open} onClose={handleClose}>
      <DialogTitle
        className={classes.title}
        disableTypography
      >
        <Typography variant='h5'>Create new a folder</Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
            <TextField
              placeholder='Enter a title'
              helperText='Title'
              onChange={(e) => {
                handleFolderNameChange(e.target.value)
              }}
            />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (folderName) {
              dispatch(
                addFolders({'name': folderName, 'folder_owned_sets': []})
              )
              handleClose()
              setFolderName('')
            }
          }}
          
          color="primary">
          Create
      </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

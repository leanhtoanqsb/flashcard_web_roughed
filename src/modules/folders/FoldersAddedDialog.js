import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addFolders } from 'modules/folders/foldersSlice';
import _ from 'lodash';
import debounce from 'lodash/debounce';

/*import { makeStyles } from '@material-ui/core/styles';*/
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

export default function FoldersAddedForm({ open, handleClose }) {
  const dispatch = useDispatch()
  const [folderName, setFolderName] = useState('')
  const handleFolderNameChange = _.debounce((value) => {
    setFolderName(value)
  }, 100)
const data = {'name': folderName, 'folder_owned_sets': []}
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Fill the form</DialogTitle>
      <DialogContent>
        <form className=''>
          <FormControl className=''>
            <InputLabel htmlFor="name-input">Folder Name</InputLabel>
            <Input
              onChange={(e) => {handleFolderNameChange(e.target.value)}}
              id="name-input"
              aria-describedby="folder-name"
            />
          </FormControl>
        </form>
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
          Ok
      </Button>
      </DialogActions>
    </Dialog>
  )
}

import React, { useState, useRef } from 'react'

import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  inputRoot: {
    marginLeft: '1rem',
    padding: '0',
    paddingTop: '0.5rem',
  },
  input: {
    fontSize: '2rem',
    lineHeight: '2.5rem',
    color:'#000000',
  },
  icons: {
    width: '5rem',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  editIcon: {
  },
  cancelIcon: {
  },
  submitIcon: {
  },
}));

export default function EditableInput({
  content,
  onChange,
  onSubmit,
  onCancel,
  ...props
}) {

  const classes = useStyles()
  const [isEditable, setIsEditable] = useState(false)
  const inputRef = useRef(null)

  return(
    <div
      className={classes.root}
    >
      <InputBase
        value={content}
        multiline={true}
        fullWidth
        classes={{
          root: classes.inputRoot,
          input: classes.input,
        }}
        disabled={!isEditable}
        inputRef={inputRef}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <div
        style={{display: isEditable ? 'none' : 'flex' }}
        className={classes.icons}
      >
      <EditIcon
        className={`${classes.editIcon} ${classes.icon}`}
        onClick={(e) => {
          e.preventDefault();
          setIsEditable(true);
          setTimeout(() => inputRef.current.focus(),100);
        }}
      />
      </div>
      <div
        style={{display: isEditable ? 'flex' : 'none' }}
        className={classes.icons}
      >
      <HighlightOffIcon
        className={`${classes.cancelIcon} ${classes.icon}`}
        onClick={() => {
          onCancel()
          setIsEditable(false)
        }}
      />
      <CheckCircleOutlineIcon
        className={`${classes.submitIcon} ${classes.icon}`}
        onClick={() => {
          onSubmit()
          setIsEditable(false)
        }}
      />
      </div>
    </div>
  )
}

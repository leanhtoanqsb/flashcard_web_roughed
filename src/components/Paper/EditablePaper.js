import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAllSets  } from 'modules/sets/setsSlice'
import SlideshowContainer from 'components/Slideshow/SlideshowContainer';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  paper: {
    fontSize: '26px',
    marginTop: theme.spacing(3),
    width: '100%',
    padding: '2rem 2rem',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  setInputRoot: {
    marginLeft: '1rem',
    padding: '0',
    paddingTop: '0.5rem',
  },
  setInput: {
    fontSize: '2rem',
    lineHeight: '2.5rem',
    color:'#000000',
  },
  termInputRoot: {
    fontSize: '1.25rem',
    padding: 0,
  },
  termInput: {
    padding: 0,
    color: 'black',
  },
  icons: {
    flexShrink: 0,
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: theme.spacing(8),
    justifyContent: 'space-between',
  },
  icon: {
  },
  editIcon: {
  },
  cancelIcon: {
  },
  submitIcon: {
  },
}));

export default function EditablePaper({
  content,
  onChangeTerm,
  onChangeMeaning,
  onSubmit,
  onCancel
}) {
  const classes = useStyles();
  const [isEditable, setIsEditable] = useState(false);
  const termRef = useRef(null)

  return(
    <Paper className={classes.paper}>
      <InputBase
        inputRef={termRef}
        classes={{
          root: classes.termInputRoot,
          input: classes.termInput,
        }}
        disabled={!isEditable}
        fullWidth
        value={content.term}
        onChange={e => onChangeTerm(e.target.value)}
      />
      <InputBase
        classes={{
          root: classes.termInputRoot,
          input: classes.termInput,
        }}
        disabled={!isEditable}
        fullWidth
        value={content.meaning}
        multiline
        onChange={e => onChangeMeaning(e.target.value)}
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
          setTimeout(() => termRef.current.focus(), 100)
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
    </Paper>
  )
}

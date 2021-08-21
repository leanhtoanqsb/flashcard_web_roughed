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
  root: {
    width: '100%',
  },
  slideshowSection: {
    width: '100%',
    height: '500px',
    paddingTop: '50px',
    background: 'white',
  },
  slideshowContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  slideshowTools: {
    width: '0%',
    height: '100%',
  },
  slideshow: {
    width: '100%',
    height: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    padding: '2rem 2rem',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  inputRoot: {
    padding: 0,
  },
  input: {
    color: 'black',
  },
  icon: {
    margin: 'auto 0',
    marginLeft: theme.spacing(1),
  },
  editIcon: {
  },
  cancelIcon: {
  },
  submitIcon: {
  },
}));

function EditablePaper({content}) {
  const classes = useStyles();
  const [isEditable, setIsEditable] = useState(false);
  const termRef = useRef(null)

  const CustomInput = ({...props}) => {
    return(
      <InputBase
        classes={{
          root: classes.inputRoot,
          input: classes.input,
        }}
        disabled={!isEditable}
        fullWidth
        {...props}
      />
    )
  }

  return(
    <Paper className={classes.paper}>
      <CustomInput
        inputRef={termRef}
        defaultValue={content.term}
      />
      <CustomInput
        defaultValue={content.meaning}
        multiline
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
          setTimeout(() => termRef.current.focus(),100);
        }}
      />
      </div>
      <div
        style={{display: isEditable ? 'flex' : 'none' }}
        className={classes.icons}
      >
      <HighlightOffIcon
        className={`${classes.cancelIcon} ${classes.icon}`}
        onClick={() => setIsEditable(false)}
      />
      <CheckCircleOutlineIcon
        className={`${classes.submitIcon} ${classes.icon}`}
        onClick={() => setIsEditable(false)}
      />
      </div>
    </Paper>
  )
}

export default function Sets({match}) {

  const classes = useStyles();
  const { setId } = useParams()

  const set = useSelector(state =>
    selectAllSets(state).find(set => set.id === parseInt(setId) )
  )

  if (!set) {
    return (
      <div>
        <h1>Post not found!</h1>
      </div>
    )
  }

  const words = set.words
  return (
    <div className={classes.root}>
      <div className={classes.slideshowSection}>
        <Container
          maxWidth='md'
          className={classes.slideshowContainer}
        >
          <div className={classes.slideshowTools}>
          </div>
          <div className={classes.slideshow}>
            <SlideshowContainer data={words} width={'400px'} height={'400px'}/>
          </div>
        </Container>
      </div>
      <Container
        maxWidth='md'
      >
        {
          words.map((word) => {
            return(
              <EditablePaper content={word}/>
            )
          })
        }
      </Container>
    </div>
  );
}

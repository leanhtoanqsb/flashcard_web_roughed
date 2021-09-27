import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  selectAllSets, editSet, deleteSet, fetchSets
} from 'modules/sets/setsSlice'
import SlideshowContainer from 'components/Slideshow/SlideshowContainer';
import EditablePaper from 'components/Paper/EditablePaper';
import EditableInput from 'components/Input/EditableInput_1';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  titleSection: {
    width: '100%',
    height: '6rem',
    paddingTop: '2rem',
    background: 'white',
  },
  titleContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  userInfoSection: {
    paddingTop: '3rem',
    background: 'white',
    paddingBottom: '3rem',
  },
  userInfoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userAvatar: {
    height: '4rem',
    borderRadius: '50%',
  },
  userInfo: {
    paddingLeft: '2rem',
  },
  slideshowSection: {
    width: '100%',
    height: '30rem',
    background: 'white',
    paddingBottom: '5rem',
  },
  slideshowContainer: {
    minWidth: '20rem',
    maxWidth: '40rem',
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
  termsSection: {
    width: '100%',
    paddingTop: '4rem',
    paddingBottom: '5rem',
  },
  termsHeader: {
    fontWeight: '600',
  },
  termsContainer: {
    width: '100%',
    paddingTop: '2rem',
  },
}));

export default function Sets({match}) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSets())
  }, [dispatch])

  const classes = useStyles()
  const { setId } = useParams()
  const [newTitle, setNewTitle] = useState(null)
  const [newWords, setNewWords] = useState(null)
  const set = useSelector(state =>
    selectAllSets(state).find(set => set.id === parseInt(setId) )
  )
  useEffect(() => {
    if (set) {
      setNewTitle(set.name)
      const newWords = set.words.map((word) => {
        return {...word}
      })
      setNewWords(newWords)
    }
  }, [set])

  const onChangeTitle = (newTitle) => {setNewTitle(newTitle)}
  const onSubmitTitle = () => {
    dispatch(editSet(
      {setId:set.id, data:{'name':newTitle}}
    ))
  }
  const onCancelTitle = () => {setNewTitle(set.name)}

  const onChangeWords = (index, property) => (value) => {
    setNewWords((prev) => {
      const newPrev = [...prev]
      newPrev[index] = {...(newPrev[index] || {}), [property]: value}
      return newPrev
    })
  }
  const onSubmitWords = () => {
    dispatch(editSet(
      {setId:set.id, data:{'words':newWords}}
    ))
  }
  const onCancelWords = () => {setNewWords(set.words)}

  if (!set) {
    return (
      <div>
        <h1>Set not found!</h1>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.titleSection}>
        <Container
          maxWidth='md'
          className={classes.titleContainer}
        >
        <EditableInput
          content={newTitle}
          onChange={onChangeTitle}
          onSubmit={onSubmitTitle}
          onCancel={onCancelTitle}
        />
        </Container>
      </div>
      <div className={classes.slideshowSection}>
        <Container
          maxWidth='md'
          className={classes.slideshowContainer}
        >
          <div className={classes.slideshowTools}>
          </div>
          <div className={classes.slideshow}>
            <SlideshowContainer data={set.words}/>
          </div>
        </Container>
      </div>
      <Container maxWidth='md'>
        <Divider />
      </Container>
      <div className={classes.userInfoSection}>
        <Container
          maxWidth='md'
          className={classes.userInfoContainer}
        >
          <img className={classes.userAvatar} alt="Avatar" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
          <div className={classes.userInfo}>
            <Typography
              variant='p'
              style={{color: '#b1b1b1',}}
            >
              Created by
            </Typography>
            <Typography
              variant='h6'
              style={{fontWeight: '600',}}
            >
              UserName
            </Typography>
          </div>
        </Container>
      </div>
      <div className={classes.termsSection}>
      <Container
        maxWidth='md'
      >
        <Typography
          variant='h5'
          classes={{root: classes.termsHeader}}
        >
          Terms in this set ({set.words.length})
        </Typography>
      <div className={classes.termsContainer}>
        {
          (newWords || []).map((word, idx) => {
            return(
              <React.Fragment key={idx}>
              <EditablePaper
                content={word}
                onChangeTerm={onChangeWords(idx, 'term')}
                onChangeMeaning={onChangeWords(idx, 'meaning')}
                onSubmit={onSubmitWords}
                onCancel={onCancelWords}
              />
              </React.Fragment>
            )
          })
        }
      </div>
      </Container>
      </div>
    </div>
  );
}

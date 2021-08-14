import React, { useState } from 'react'

import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  container: props => ({
    width: '100%',
    height: '100%',
    position:'relative',
    transformStyle: 'preserve-3d',
    transition: '.6s',
    transform: props.isFlip ? 'rotateY(180deg)': '',
  }),
  inner: {
    borderRadius: theme.spacing(4),
    boxShadow: '0px 2px 10px 3px rgba(0,0,0,.2)',
    background: 'white',
    backfaceVisibility:'hidden',
    position: 'absolute',
    width:'100%',
    height:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  front: {
    transform: 'rotateY(0deg)',
  },
  back: {
    transform: 'rotateY(180deg)',
  },
}));


export default function SlideshowCard({word}) {
  const [isFlip, setIsFlip] = useState(false)
  const props = {isFlip: isFlip}
  const classes = useStyles(props)
  const handleFlip = () => setIsFlip(prev => !prev)

  return (
    <div className={classes.root}>
      <div className={classes.container} onClick={handleFlip} >
        <div className={`${classes.inner} ${classes.front}`}>
          <Typography variant='h2'>
            {word.term ? word.term : 'No text'}
          </Typography>
        </div>
        <div className={`${classes.inner} ${classes.back}`}>
          <Typography variant='h4'>
            {word.meaning ? word.meaning : 'No meaning'}
          </Typography>
        </div>
      </div>
    </div>
  );
}



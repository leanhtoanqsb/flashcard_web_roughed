import React, { useState } from 'react';
import SlideshowCard from './SlideshowCard';

import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  root: props => ({
    /*
    width: props.width,
    height: props.height,
    */
    width: '100%',
    height: '100%',
    background: 'white',
  }),
  container: {
    width: '100%',
    height: '100%',
    display:'flex',
    flexDirection: 'column',
  },
  inner: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    flex: '1 1 100%',
  },
  capture: {
    position: 'absolute',
    width: theme.spacing(4),
    height: '100%',
    background: 'white',
    top: 0,
    zIndex:1,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  slide: props => ({
    position: 'absolute',
    height: '100%',
    width: props.width,
    top: 0,
    left: props.left,
    transition: '.6s',
    display:'flex',
  }),
  cardContainer: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(6),
    paddingBottom: theme.spacing(2),
  },
  navigation: {
    width: '100%',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNumber: {
    width: '100px',
    height: '100%',
  },
  navIcon: {
    cursor: 'pointer',
  }
}));


export default function SlideshowContainer({data}) {
  const [cardIndex, setCardIndex] = useState(0)
  const props = {
    width: `${data.length * 100}%`,
    left: `${(-1)* cardIndex  * 100}%`,
  }
  const classes = useStyles(props)
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.inner}>
          <div className={`${classes.capture} ${classes.left}`}>
          </div>
          <div className={`${classes.capture} ${classes.right}`}>
          </div>
          <div className={classes.slide}>
          {
            data.map((word) => {
              return (
                <div  className={classes.cardContainer}>
                <SlideshowCard word={word} />
                </div>
              )
            })
          }
          </div>
        </div>
        <div className={classes.navigation}>
          <ArrowBackIcon
            className={classes.navIcon}
            onClick={() => {
              setCardIndex((prev) => {return prev ===  0 ? data.length - 1 : prev - 1})
            }}
          />
          <div className={classes.cardNumber}>
          </div>
          <ArrowForwardIcon
            className={classes.navIcon}
            onClick={() => {
              setCardIndex((prev) => {return prev === data.length - 1 ? 0 : prev + 1})
            }}
          />
        </div>
      </div>
    </div>
  );
}



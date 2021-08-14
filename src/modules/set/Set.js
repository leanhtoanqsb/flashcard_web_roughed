import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAllSets  } from 'modules/sets/setsSlice'
import SlideshowContainer from 'components/Slideshow/SlideshowContainer';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

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
    height: '100px',
    padding: theme.spacing(2)
  },
}));


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
                <Paper className={classes.paper}>
                  <Typography variant="body2" gutterBottom>
                    {word.term}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {word.meaning}
                  </Typography>
                </Paper>
            )
          })
        }
      </Container>
    </div>
  );
}

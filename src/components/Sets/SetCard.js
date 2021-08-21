import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    padding: '1rem 2rem',
    '& *': {
    fontFamily: 'Josefin Sans',
    }
  },
  setName: {
    fontWeight: '700',
  },
  numberOfTerm: {
  },
  user: {
  },
}))

export default function SetCard({setData, linkDestination}) {
  const classes = useStyles();

  return(
    <Paper
      component={Link}
      to={`/set/${setData.id}`}
      className={classes.paper}
    >
      <Typography
        variant="h5"
        className={classes.setName}
      >
        {setData.name}
      </Typography>
      <Typography
        className={classes.numberOfTerm}
        variant="subtitle1"
      >
        {setData.words.length} term
        {setData.words.length === 1 ? "" : "s"}
      </Typography>
      <div style={{flexGrow:1}}>
      </div>
      <Typography
        variant="subtitle1"
        className={classes.user}
      >
       User Name 
      </Typography>
    </Paper>
  )
}


import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  gridItem: {
    height:'12rem',
  },
  paper: {
    height:'100%',
    width:'100%',
  },
}));


export default function Loading() {
  const classes = useStyles();

  const GridItem = ({...props}) => {
    return( 
      <Grid item
        xs={12} sm={6} md={4}
        className={classes.gridItem}
      >
        <Paper className={classes.paper} />
      </Grid>
    )
  }


  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <GridItem />
          <GridItem />
          <GridItem />
        </Grid>
      </Container>
    </div>
  );
}



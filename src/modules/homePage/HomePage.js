import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllSets } from 'modules/sets/setsSlice'
import SetCard from 'components/Sets/SetCard';
import Loading from 'components/Loading/Loading';

import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  setListSection: {
    width: '100%',
    marginTop: theme.spacing(8),
  },
}));


export default function Sets() {
  const classes = useStyles();
  const sets = useSelector(state => 
    selectAllSets(state)
  )
  const setsStatus = useSelector(state => state.sets.status)

  const GridItem = ({...props}) => {
    return( 
      <Grid item
        xs={12} sm={6} md={4}
        style={{height:'12rem'}}
        {...props}
      />
    )
  }

  if (setsStatus == 'loading') {
    return (
    <div className={classes.setListSection}>
      <Loading />
    </div>
    )
  }

  return (
    <div className={classes.setListSection}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {(sets || []).map((set) => {
            return (
              <GridItem>
                <SetCard setData={set} />
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}



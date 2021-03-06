import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllSets } from 'modules/sets/setsSlice'
import { selectAllFolders  } from 'modules/folders/foldersSlice'
import { Link, useParams } from 'react-router-dom';
import SetsAddedDialog from 'components/Sets/SetsAddedDialog';
import Loading from 'components/Loading/Loading';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  userInfoSection: {
    width: "100%",
    padding: theme.spacing(2),
    background: "white",
  },
  userInfoInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  userImage: {
    paddingRight: theme.spacing(2),
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: "50%",
    border: "1px solid red",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  userText: {
    flexGrow: 1,
  },
  setListSection: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    marginTop: theme.spacing(4)
  },
  setName: {
  },
  link: {
    textDecoration: 'none',
  },
}));


export default function Sets() {
  const { folderId } = useParams();
  const classes = useStyles();
  const [addedFormOpen, setAddedFormOpen] = useState(false);
  const handleAddedFormClose = () => {
    setAddedFormOpen(false);
  };
  const handleAddedFormOpen = () => {
    setAddedFormOpen(true);
  };

  const sets = useSelector(state => 
    selectAllSets(state)
  )
  const setsStatus = useSelector(state => state.sets.status )

  return (
    <div className={classes.root}>
    <div className={classes.setListSection}>
      <Container disableGutters="true" maxWidth="md">
            <Button
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={handleAddedFormOpen}
            >
              <Typography variant="h6">New Set</Typography>
            </Button>
            <SetsAddedDialog
              open={addedFormOpen}
              handleClose={handleAddedFormClose}
              folderId={folderId}
            />
    {/* Slideshow start*/}
      <div>
    {
          setsStatus == 'loading' ? <Loading /> : null
    }
    {
        (sets || []).map((set) => {
          return (
            <Link
              className={classes.link}
              to={`/set/${set.id}`}
            >
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="subtitle1">
                {set.words.length} word{set.words.length === 1 ? "" : "s"}
              </Typography>
                <Typography variant="h5" className={classes.setName}>
                  {set.name}
                </Typography>
            </Paper>
            </Link>
          );
        })}
      </div>
    {/* Slideshow end */}
      </Container>
      </div>
      </div>
  );
}

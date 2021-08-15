import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllSets } from 'modules/sets/setsSlice'
import { selectAllFolders  } from 'modules/folders/foldersSlice'
import { Link, useParams } from 'react-router-dom';
import SetsAddedDialog from 'components/Sets/SetsAddedDialog';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ButtonBase from "@material-ui/core/ButtonBase";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  folderInfoSection: {
    width: "100%",
    padding: theme.spacing(2),
    background: "white",
  },
  folderInfoInner: {
  },
  folderInfo: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  folderName: {
    marginLeft: theme.spacing(2),
    textTransform: 'uppercase',
  },
  descriptionContainer: {
    flexGrow: 1,
  },
  folderDescription: {
    flexGrow: 1,
  },
  folderIcon: {
    fontSize: '64px',
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

  const folder = useSelector(state =>
    selectAllFolders(state).find(folder => folder.id === parseInt(folderId)) 
  )
  const sets = useSelector(state => 
    selectAllSets(state).filter(set => folder ? folder.folder_owned_sets.includes(set.id ) : false)
  )

  if (!folder) {
    return (
      <div>
        <h1>Folder not found!</h1>
      </div>
    )
  }

  return (
    <div className={classes.root}>
        <div className={classes.folderInfoSection}>
          <Container
            className={classes.folderInfoInner}
            disableGutters="true"
            maxWidth="md"
          >
            <div className={classes.folderInfo}>
              <FolderOpenIcon
                className={classes.folderIcon}
              />
              <Typography
                className={classes.folderName}
                variant="h4"
              >
                {folder.name}
              </Typography>
            </div>
            <div className={classes.descriptionContainer}>
              <Typography
                className={classes.folderDescription}
                variant="body2" color="textSecondary"
              >
                Description:
              </Typography>
            </div>
          </Container>
        </div>
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
        {sets.map((set) => {
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



import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllSets } from 'modules/sets/setsSlice'
import { selectAllFolders, editFolder,deleteFolder } from 'modules/folders/foldersSlice'
import { Link, useParams } from 'react-router-dom';
import SetsAddedDialog from 'components/Sets/SetsAddedDialog';
import SetCard from 'components/Sets/SetCard';
import EditableInput from 'components/Input/EditableInput_1';
import Loading from 'components/Loading/Loading';

import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ButtonBase from "@material-ui/core/ButtonBase";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  folderInfoSection: {
    width: "100%",
    minHeight: "8rem",
    padding: '2rem 1rem',
    background: "white",
  },
  folderInfoInner: {
  },
  folderInfo: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  folderDescription: {
    flexGrow: 1,
  },
  folderIcon: {
    fontSize: '3rem',
  },
  setListSection: {
    padding: '1rem',
    paddingTop: '2rem',
  },
  addButton: {
    marginBottom: '2rem',
  },
}));


export default function Sets() {
  const { folderId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch()

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
  const folderStatus = useSelector(state => state.folders.status)
  console.log(folderStatus)
  const sets = useSelector(state => 
    selectAllSets(state).filter(set => folder ? folder.folder_owned_sets.includes(set.id ) : false)
  )
  const [newFolderTitle, setNewFolderTitle] = useState(null)
  useEffect(() => {
    if (folder) {
      setNewFolderTitle(folder.name)
    }
  }, [folder])
  const onChangeFolderTitle = (newTitle) => {
    setNewFolderTitle(newTitle)
  }
  const onSubmitFolderTitle = () => {
    dispatch(editFolder(
      {folderId:folder.id, data:{'name':newFolderTitle}}
    ))
  }
  const onCancelFolderTitle = () => {setNewFolderTitle(folder.name)}

  const GridItem = ({...props}) => {
    return( 
      <Grid item
        xs={12} sm={6} md={4}
        style={{height:'12rem'}}
        {...props}
      />
    )
  }

  if (folderStatus == 'loading') {
    return (
    <div className={classes.root}>
      <div className={classes.setListSection}>
        <Loading />
      </div>
    </div>
    )
  }

  if (!folder) {
    return (
    <div className={classes.root}>
      <div className={classes.setListSection}>
        <Container maxWidth="md">
          <h1>Folder not found!</h1>
        </Container>
      </div>
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
            <div
              className={classes.folderInfo}
            >
              <FolderOpenIcon
                className={classes.folderIcon}
              />
              <EditableInput
                content={newFolderTitle}
                onChange={onChangeFolderTitle}
                onSubmit={onSubmitFolderTitle}
                onCancel={onCancelFolderTitle}
              />
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
     <Grid container spacing={3}>
        {sets.map((set) => {
          return (
            <GridItem>
              <SetCard setData={set} />
            </GridItem>
          );
        })}
      </Grid>
      </Container>
      </div>
      </div>
  );
}




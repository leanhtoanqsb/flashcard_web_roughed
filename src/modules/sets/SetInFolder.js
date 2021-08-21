import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllSets } from 'modules/sets/setsSlice'
import { selectAllFolders, editFolder,deleteFolder } from 'modules/folders/foldersSlice'
import { Link, useParams } from 'react-router-dom';
import SetsAddedDialog from 'components/Sets/SetsAddedDialog';
import SetCard from 'components/Sets/SetCard';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ButtonBase from "@material-ui/core/ButtonBase";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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
    alignItems: "flex-start",
  },
  folderName: {
    marginLeft: theme.spacing(2),
    '& textarea': {
      lineHeight: '2rem',
      color:'#000000',
      fontSize: '2rem',
    },
  },
  icons: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  editIcon: {
  },
  cancelIcon: {
  },
  submitIcon: {
  },
  folderDescription: {
    flexGrow: 1,
  },
  folderIcon: {
    fontSize: '3rem',
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
  const dispatch = useDispatch()
  const [isEditable, setIsEditable] = useState(false);
  const folderNameRef = useRef(null)
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

  const GridItem = ({...props}) => {
    return( 
      <Grid item
        xs={12} sm={6} md={4}
        style={{height:'12rem'}}
        {...props}
      />
    )
  }

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
            <div
                onClick={() => dispatch(
                  editFolder({folderId:folderId, data: {'name': 'd'}})
                )}
              className={classes.folderInfo}
            >
              <FolderOpenIcon
                className={classes.folderIcon}
              />
              <TextField
                inputRef={folderNameRef}
                multiline={true}
                fullWidth={true}
                disabled={!isEditable}
                InputProps={{
                  style: {
                    padding: '.625rem 0',
                  },
                  disableUnderline:'true',
                }}
                defaultValue={folder.name}
                classes={{root:classes.folderName}}
                
              />
              <div
                style={{display: isEditable ? 'none' : 'flex' }}
                className={classes.icons}
              >
              <EditIcon
                className={`${classes.editIcon} ${classes.icon}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditable(true);
                  setTimeout(() => folderNameRef.current.focus(),100);
                }}
              />
              </div>
              <div
                style={{display: isEditable ? 'flex' : 'none' }}
                className={classes.icons}
              >
              <HighlightOffIcon
                className={`${classes.cancelIcon} ${classes.icon}`}
                onClick={() => setIsEditable(false)}
              />
              <CheckCircleOutlineIcon
                className={`${classes.submitIcon} ${classes.icon}`}
                onClick={() => setIsEditable(false)}
              />
              </div>
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




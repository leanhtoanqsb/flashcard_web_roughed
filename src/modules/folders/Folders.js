import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllFolders } from "modules/folders/foldersSlice";
import FoldersAddedDialog from "components/Folders/FoldersAddedDialog";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  foldersListSection: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
  },
  addButton: {
    marginBottom: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
  },
  paper: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
  },
  folderNameContainer: {
    width: '100%',
    display: "flex",
    alignItems: "center",
  },
  folderIcon: {
    color: "#ccc",
  },
  folderName: {
    flex: '1',
    fontWeight: 700,
    marginLeft: theme.spacing(2),
  },
}));

export default function Folders() {
  const classes = useStyles();
  const folders = useSelector(selectAllFolders);
  const [foldersAddedFormOpen, setFoldersAddedFormOpen] = useState(false);
  const handleAddedFormClose = () => {
    setFoldersAddedFormOpen(false);
  };
  const handleAddedFormOpen = () => {
    setFoldersAddedFormOpen(true);
  };

  return (
      <div className={classes.root}>
        <div className={classes.foldersListSection}>
          <Container disableGutters="true" maxWidth="md">
            <Button
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={handleAddedFormOpen}
            >
              <Typography variant="h6">
                New Folder
              </Typography>
            </Button>
            <FoldersAddedDialog
              open={foldersAddedFormOpen}
              handleClose={handleAddedFormClose}
            />
            <div>
              {folders.map((folder) => {
                return (
                  <Link
                    key={folder.id}
                    className={classes.link}
                    to={`/folder/${folder.id}`}
                  >
                    <Paper className={classes.paper}>
                      <Typography gutterBottom variant="subtitle1">
                        {folder.folder_owned_sets.length} set
                        {folder.folder_owned_sets.length === 1 ? "" : "s"}
                      </Typography>
                      <div className={classes.folderNameContainer}>
                        <FolderOpenIcon
                          fontSize="large"
                          className={classes.folderIcon}
                        />
                        <Typography variant="h5" className={classes.folderName}>
                          {folder.name}
                        </Typography>
                      </div>
                    </Paper>
                  </Link>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
  );
}

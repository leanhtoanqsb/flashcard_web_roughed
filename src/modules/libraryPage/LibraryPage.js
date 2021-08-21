import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllFolders } from "modules/folders/foldersSlice";
import FoldersAddedDialog from "components/Folders/FoldersAddedDialog";
import { Link,Route, Switch,  useRouteMatch, useLocation } from "react-router-dom";
import Folders from 'modules/folders/Folders';
import Sets from 'modules/sets/Sets';

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  userInfoSection: {
    width: "100%",
    background: "white",
  },
  userInfoInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: '2rem',
  },
  userImage: {
    paddingRight: theme.spacing(2),
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: "50%",
    overflow: 'hidden',
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
  navTabs: {
    paddingTop: '2rem',
  },
  foldersListSection: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
  },
}));

export default function LibraryPage() {
  const classes = useStyles();
  const {path, url} = useRouteMatch()
  const location = useLocation()

  return (
      <div className={classes.root}>
        <div className={classes.userInfoSection}>
          <Container
            className={classes.userInfoInner}
            disableGutters="true"
            maxWidth="md"
          >
            <div className={classes.userImage}>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="Avatar" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
              </ButtonBase>
            </div>
            <div className={classes.userText}>
              <Typography gutterBottom variant="h4">
                User Name
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ID:
              </Typography>
            </div>
          </Container>
          <Container
            className={classes.navTabs}
            disableGutters="true"
            maxWidth="md"
          >
            <Tabs value={location.pathname}>
              <Tab label="Folders" value={`${url}/folders`} component={Link} to={`${url}/folders`} />
              <Tab label="Study Sets" value={`${url}/sets`} component={Link} to={`${url}/sets`} />
            </Tabs>
          </Container>
        </div>
        <div className={classes.foldersListSection}>
          <Switch>
            <Route path={`${path}/folders`}>
              <Folders />
            </Route>
            <Route path={`${path}/sets`}>
              <Sets />
            </Route>
          </Switch>
        </div>
      </div>
  );
}

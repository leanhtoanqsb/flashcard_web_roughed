import React from 'react';
import NavLinkCustom from './NavLinkCustom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userImage: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    marginRight: theme.spacing(2),
    color: theme.customColor.text.gray,
    border:`1px solid ${theme.customColor.border.gray}`,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  userText: {
    color: 'white',
  },
  listLinkContainer: {
    width: '100%',
    paddingTop: theme.spacing(2),
  },
  linkContainer: {
    width: '100%',
    paddingBottom: theme.spacing(1),
  },
}));

const ListLinkSetting = () => {
  const classes = useStyles()

  const listLink = [
    {name: 'profile', path: ''},
    {name: 'setting', path: ''},
    {name: 'night mode', path: ''},
    {name: 'log in', path: ''},
  ]

  return (
    listLink.map((link) => {
      return(
        <div
          key={link.name}
          className={classes.linkContainer}
        >
          <NavLinkCustom variant='h6' to={link.path}>
            {link.name}
          </NavLinkCustom>
        </div>
      )
    })
  );
}

export default function UserSetting() {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <div className={classes.user}>
        <div className={classes.userImage}>
          <img className={classes.img} alt="Ava" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
        </div>
        <div className={classes.userText}>
          <Typography variant="h5">
            User Name
          </Typography>
        </div>
      </div>
      <div className={classes.listLinkContainer}>
        <ListLinkSetting />
      </div>
    </div>
  );
}

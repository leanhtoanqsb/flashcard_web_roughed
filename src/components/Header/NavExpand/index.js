import React from 'react';
import LibraryAccordion from './LibraryAccordion';
import CreateAccordion from './CreateAccordion';
import UserSetting from './UserSetting';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#4257b2',
    height: '100vh',
  },
  container: {
    padding: theme.spacing(2),
  },
  closeIcon: {
    color: 'white',
    cursor: 'pointer',
  },
  divider: {
    background: theme.customColor.dividerGray,
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userImage: {
  },
  img: {
  },
  userText: {
  },
  userSettingInner: {
    paddingLeft: theme.spacing(2),
  },
}));

export default function NavExpand({isOpen, handleOpen}) {
  const classes = useStyles()

  return (
    <div
      onKeyDown={(e) => {
        if (e.key==='Tab' || e.key==='Shift') return;
        handleOpen(false)
      }}
    >
      <Drawer classes={{paper:classes.root}} anchor={'top'} open={isOpen}>
        <div className={classes.container} >
          <CloseIcon
            fontSize='large'
            classes={{root: classes.closeIcon}}
            onClick={() => handleOpen(false)}
          />
          <div>
            <LibraryAccordion
              handleNavExpanded={handleOpen}
            />     
            <CreateAccordion
              handleNavExpanded={handleOpen}
            />     
          </div>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.container}>
          <div className={classes.userSettingInner}>
            <UserSetting />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

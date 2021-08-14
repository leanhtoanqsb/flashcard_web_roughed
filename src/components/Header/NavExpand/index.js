import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import LibraryAccordion from './LibraryAccordion';
import CreateAccordion from './CreateAccordion';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#4257b2',
    height: '100vh',
    padding: theme.spacing(2),
  },
  closeIcon: {
    color: 'white',
    cursor: 'pointer',
  },
  fullHeight: {
    height: '100vh',
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
          </Drawer>
    </div>
  );
}

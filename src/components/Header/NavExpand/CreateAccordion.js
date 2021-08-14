import React from 'react';
import AccordionContainer from './AccordionContainer';
import NavLinkCustom from './NavLinkCustom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuItems: {
    width: '100%',
    display: 'flex',
    alignItems:'flex-start',
    flexDirection: 'column',
    paddingLeft: theme.spacing(4)
  },
}));

export default function CreateAccordion({handleNavExpanded}) {
  const classes = useStyles();

  const LibraryMenuItems = () => {
    return(
      <div className={classes.menuItems}>
        <div onClick={() => handleNavExpanded(false)}>
          <NavLinkCustom
            variant='h6'
          >
            Study Set
          </NavLinkCustom>
        </div>
        <div onClick={() => handleNavExpanded(false)}>
          <NavLinkCustom
            variant='h6'
          >
            Folder
          </NavLinkCustom>
        </div>
      </div>
    )
  }

  return (
      <AccordionContainer
        header='Create'
      > 
        <LibraryMenuItems/>
      </AccordionContainer>
  );
}

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
  },
  item: {
    marginBottom: theme.spacing(1),
  },
}));

export default function LibraryAccordion({handleNavExpanded}) {
  const classes = useStyles();

  const LibraryMenuItems = () => {
    return(
      <div
        className={classes.menuItems}
          onClick={(e) => {
            handleNavExpanded(false)
          }}
      >
        <div className={classes.item}>
          <NavLinkCustom
            to='/library/sets'
            variant='h6'
          >
            Study Sets
          </NavLinkCustom>
        </div>
        <div
          onClick={(e) => {
            handleNavExpanded(false)
          }}
        >
          <NavLinkCustom
            to='/library/folders'
            variant='h6'
          >
            Folders
          </NavLinkCustom>
        </div>
      </div>
    )
  }

  return (
      <AccordionContainer
        header='Your library'
      > 
        <LibraryMenuItems/>
      </AccordionContainer>
  );
}

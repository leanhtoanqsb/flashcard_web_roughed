import React,{ useState } from 'react';
import AccordionContainer from './AccordionContainer';
import NavLinkCustom from './NavLinkCustom';
import FoldersAddedDialog from "components/Folders/FoldersAddedDialog";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

export default function CreateAccordion({handleNavExpanded}) {
  const classes = useStyles();
  const [foldersAddedFormOpen, setFoldersAddedFormOpen] = useState(false);
  const handleAddedFormClose = () => {
    setFoldersAddedFormOpen(false);
  };
  const handleAddedFormOpen = () => {
    setFoldersAddedFormOpen(true);
  };
  console.log(foldersAddedFormOpen)


  const LibraryMenuItems = () => {
    return(
      <div className={classes.menuItems}>
        <div
          className={classes.item}
          onClick={() => handleNavExpanded(false)}
        >
          <NavLinkCustom
            variant='h6'
            to='/create-set'
          >
            Study Set
          </NavLinkCustom>
        </div>
        <div
          onClick={() => handleAddedFormOpen()}
        >
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
            <FoldersAddedDialog
              open={foldersAddedFormOpen}
              handleClose={handleAddedFormClose}
            />
      </AccordionContainer>
  );
}

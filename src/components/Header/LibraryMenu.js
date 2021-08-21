import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
}));

export default function LibraryMenu({
    libraryAnchorEl,
    isLibraryMenuOpen,
    handleMenuClose,
  }) {
  const classes = useStyles();

    return <Menu
      anchorEl={libraryAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isLibraryMenuOpen}
      onClose={handleMenuClose}
      // https://github.com/mui-org/material-ui/issues/7961
      getContentAnchorEl={null}
    >
      <MenuItem
        component={Link} to='/library/sets'
        onClick={handleMenuClose}
      >
        StudySet
      </MenuItem>
      <MenuItem
        component={Link} to='/library/folders'
        onClick={() => {
          handleMenuClose()
        }}
      >
        Folder
      </MenuItem>
    </Menu>
  }



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';

export default function CreateMenu({
    createAnchorEl,
    isCreateMenuOpen,
    handleMenuClose,
    handleFoldersAddedFormOpen
  }) {
    return(
      <Menu
        anchorEl={createAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isCreateMenuOpen}
        onClose={handleMenuClose}
        // https://github.com/mui-org/material-ui/issues/7961
        getContentAnchorEl={null}
      >
        <MenuItem component={Link} to='/create-set' onClick={handleMenuClose}>Study Set</MenuItem>
        <MenuItem
          onClick={() => {
            handleFoldersAddedFormOpen()
            handleMenuClose()
          }}>Folder</MenuItem>
      </Menu>
    )
  }



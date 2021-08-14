import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
}));

export default function MobileMenu({
  profileAnchorEl,
  isProfileMenuOpen,
  handleMenuClose,
}) {
  const classes = useStyles();

  return (
    <Menu
      anchorEl={profileAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={handleMenuClose}
      // https://github.com/mui-org/material-ui/issues/7961
      getContentAnchorEl={null}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
 
  )
}

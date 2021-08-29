import React from 'react';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.customColor.text.gray,
    '&:hover': {
      color: 'white',
    },
  },
  title: {
    textTransform: 'lowercase',
    '&::first-letter': {
      textTransform: 'uppercase',
    },
  },
}));

export default function NavLinkCustom({to, variant, children}) {
  const classes = useStyles();

  return (
    <Link
      className={classes.link}
      to={to}
    >
      <Typography
        className={classes.title}
        variant={variant}
      >
        {children}
      </Typography>
    </Link>
  );
}

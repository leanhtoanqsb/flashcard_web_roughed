import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: 'transparent',
    color: '#cedaf3',
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none',
  },
  summaryRoot: {
    justifyContent: 'flex-start',
    height: '48px',
    '&.Mui-expanded': {
      minHeight: '0', 
    },
    '&:hover': {
      '& $heading, $summaryExpandIcon': {
        color: 'white',
      },
    }
  },
  summaryContent: {
    flexGrow: '0',
    color: '#cedaf3'
  },
  summaryExpandIcon: {
    color: '#cedaf3',
  },
  heading: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  menuContainer: {
    paddingRight: theme.spacing(2),
  },
}));

export default function AccordionContainer({header, children}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion
        classes={{root: classes.paper}}
      >
        <AccordionSummary
          className={classes.summaryRoot}
          classes={{
            content:classes.summaryContent,
            expandIcon:classes.summaryExpandIcon,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${header}-accordion-content`}
          id={`${header}-accordion-header`}
        >
          <Typography
            variant='h6'
            className={classes.heading}
          >
            {header}            
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.menuContainer}>
            {children}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

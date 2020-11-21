import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import UserContext from '../utils/UserContext';
import NoContent from './pin/NoContent';
import CreatePin from './pin/CreatePin';
import PinContent from './pin/PinContent';

const useStyles = makeStyles(themes => ({
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: 'calc(100vh - 64px)',
    overflowY: 'scroll',
    display: 'flex',
    justifyContent: 'center'
  },
  rootMobile: {
    maxWidth: '100%',
    maxHeight: 300,
    overflowX: 'hidden',
    overflowY: 'scroll',
  }
}))

export default function Blog() {
  const classes = useStyles();
  const { state } = useContext(UserContext);
  const { draft, currentPin } = state;

  let BlogContent;
  if(!draft && !currentPin) {
    BlogContent = NoContent;
  } else if(draft && !currentPin) {
    BlogContent = CreatePin;
  } else if(!draft && currentPin) {
    BlogContent = PinContent;
  }

  return (
    <Paper className={classes.root}>
      <BlogContent />
    </Paper>
  )
}

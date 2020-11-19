import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(themes => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  icon: {
    margin: themes.spacing.unit,
    fontSize: '80px',
  }
}))

export default function NoContent() {
  const classes = useStyles();
  return (
    <div>
      No Content
    </div>
  )
}

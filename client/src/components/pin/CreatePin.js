import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(themes => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: themes.spacing.unit,
  },
  contentField: {
    marginLeft: themes.spacing.unit,
    marginRight: themes.spacing.unit,
    width: '95%',
  }
}))

export default function CreatePin() {
  const classes = useStyles();
  return (
    <div>
      Create Pin
    </div>
  )
}

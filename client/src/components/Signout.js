import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { Typography } from '@material-ui/core';

import UserContext from '../utils/UserContext';

const useStyles = makeStyles(() => ({
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    color: "orange"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange"
  }
}))

const Signout = () => {
  const classes = useStyles();
  const { dispatch } = useContext(UserContext);

  const onSignout = () => {
    dispatch({ type: "SIGNOUT_USER" })
    console.log('signed out user');
  }

  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      buttonText="Signout"
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          <Typography
            variant="body1"
            className={classes.buttonText}
          >
            Signout
          </Typography>
          <ExitToApp className={classes.buttonIcon} />
        </span>
      )}
    />
  )
}

export default Signout
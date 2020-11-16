import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';

import UserContext from '../utils/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(1),
    color: 'green',
    fontSize: 45
  },
  mobile: {
    display: 'none'
  },
  picture: {
    height: '50px',
    borderRadius: '90%',
    marginRight: theme.spacing(2)
  }
}));

const Header = () => {
  const classes = useStyles();
  const { state } = useContext(UserContext);
  const { currentUser } = state;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MapIcon className={classes.icon} />
          <div className={classes.grow}>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
            >
              Geo-Pins
            </Typography>
          </div>
          {currentUser && (
            <div className={classes.grow} style={{textTransform: 'capitalize'}}>
              <img 
                className={classes.picture} 
                src={currentUser.picture} 
                alt={currentUser.name} 
              />
              <Typography 
                variant='h5' 
                color='inherit' 
                noWrap
              >
                {currentUser.name}
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
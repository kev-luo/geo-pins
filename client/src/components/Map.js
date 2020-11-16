import React, { useState } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  },
  rootMobile: {
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  navigationControl: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '1em'
  },
  deleteIcon: {
    color: 'red'
  },
  popupImage: {
    padding: '0.4em',
    height: 200,
    width: 200,
    objectFit: 'cover'
  },
  popupTab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}))

const initialViewport = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
}

export default function Map() {
  const classes = useStyles();
  // be able to change viewport by keeping track of viewport in state
  const [viewport, setViewport] = useState(initialViewport);

  return (
    <div className={classes.root}>
      <ReactMapGL
        width='100vw'
        height='calc(100vh - 64px)'
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={newViewport => setViewport(newViewport)}
        {...viewport}
      >
      {/* navigation control */}
      <div className={classes.navigationControl}>
        <NavigationControl
          onViewportChange={newViewport => setViewport(newViewport)}
        />
      </div>
      </ReactMapGL>
    </div>
  )
}

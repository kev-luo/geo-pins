import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';

import { useClient } from '../utils/graphQlClient';
import { GET_PINS_QUERY } from '../utils/graphql/queries';
import PinIcon from './PinIcon';
import UserContext from '../utils/UserContext';
import Blog from './Blog';

const initialViewport = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
}

export default function Map() {
  const classes = useStyles();
  const client = useClient();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    getPins();
  }, [])
  // be able to change viewport by keeping track of viewport in state
  const [viewport, setViewport] = useState(initialViewport);
  // pin user position
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, [])


  const getUserPosition = () => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        // get user's latitude and longitude and set viewport as well as user position state variables to user coords
        const { latitude, longitude } = position.coords
        setViewport({...viewport, latitude, longitude })
        setUserPosition({ latitude, longitude })
      })
    }
  }

  const getPins = async() => {
    const { getPins } = await client.request(GET_PINS_QUERY)
    dispatch({ type: "GET_PINS", payload: getPins})
    console.log(getPins);
  }

  const handleMapClick = event => {
    console.log(event);
    const { lngLat, leftButton } = event;

    if(!leftButton) {
      return;
    }
    if(!state.draft) {
      dispatch({ type: "CREATE_DRAFT" })
    }

    const [longitude, latitude] = lngLat
    dispatch({ 
      type: "UPDATE_DRAFT_LOCATION", 
      payload: { longitude, latitude }
    })
  }

  return (
    <div className={classes.root}>
      <ReactMapGL
        width='100vw'
        height='calc(100vh - 64px)'
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
        {...viewport}
      >
      {/* navigation control */}
      <div className={classes.navigationControl}>
        <NavigationControl
          onViewportChange={newViewport => setViewport(newViewport)}
        />
      </div>
      {/* pin for user's current location */}
      {userPosition && (
        <Marker
          latitude={userPosition.latitude}
          longitude={userPosition.longitude}
          offsetLeft={-19}
          offsetTop={-37}
        >
        <PinIcon size={40} color="red"/>
        </Marker>
      )}
      {/* draft pin */}
      {state.draft && (
        <Marker
          latitude={state.draft.latitude}
          longitude={state.draft.longitude}
          offsetLeft={-19}
          offsetTop={-37}
        >
        <PinIcon size={40} color="hotpink"/>
        </Marker>
      )}
      {/* created pins */}
      {state.pins.map(pin => {
        return(
          <Marker
            key={pin._id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="darkblue" />
          </Marker>
        )
      })}
      </ReactMapGL>
      {/* blog area to add pin content */}
      <Blog />
    </div>
  )
}

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
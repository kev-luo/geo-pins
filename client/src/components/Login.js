import React, { useContext } from 'react'
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import UserContext from '../utils/UserContext';
import { ME_QUERY } from '../utils/graphql/queries';
import {BASE_URL} from '../utils/graphQlClient';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

function Login() {
  const classes = useStyles();
  const { dispatch } = useContext(UserContext);
  // this authenticates user on the client. after this we need to authenticate them on the backend (ie on our server). This involves sending id_token to our server, checking to see if it's valid, getting the user's google info there, and when we execute a query from the client asking for the current user's information we'll send it back from the server. upon which we'll store the info in our app and redirect them t our home component.
  const onSuccess = async (googleUser) => {
    // returns object with logged in user info
    // we want to send id_token to our backend on an authorization header. backend verifies the token. From there it gets the google user's profile information, which the client then asks for using the graphql 'me' query that we set up. the user's info will be sent back to the client in response to that query and the user will be logged in.
    // console.log(googleUser);
    // getAuthResponse returns an object from which we can grab the id_token
    // console.log(googleUser.getAuthResponse())
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      // console.log(idToken);
      const client = new GraphQLClient(BASE_URL, {
        // config object
        headers: { authorization: idToken }
      })
      // make a request to execute a query/mutation. this returns a promise
      // asking for current user data after we successfully login, and pass through the idToken from the login
      const data = await client.request(ME_QUERY)
      // console.log(data);

      dispatch({ type: "LOGIN_USER", payload: data.me })
      // isSignedIn() returns a true/false value depending on if the user is signed in
      dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() })
    } catch(err) {
      onFailure(err);
    }
  }

  const onFailure = err => {
    console.error("Error logging in", err);
    dispatch({ type: "IS_LOGGED_IN", payload: false })
  }

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: 'rgb(66, 133, 244)' }}  
      >
        Welcome
      </Typography>
      {/* isSignedIn remembers if a user previously signed in */}
      <GoogleLogin 
        clientId={process.env.REACT_APP_OATH_CLIENT_ID} 
        onSuccess={onSuccess}
        onFailure={onFailure} 
        isSignedIn={true}
        buttonText="Login with Google"
        theme="dark"
      />
    </div>
  )
}

export default Login
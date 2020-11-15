import React, { useContext } from 'react'
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';

import UserContext from '../../utils/UserContext';

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

export default withStyles(styles)(function Login({ classes }) {
  const { dispatch } = useContext(UserContext);
  // this authenticates user on the client. after this we need to authenticate them on the backend (ie on our server). This involves sending id_token to our server, checking to see if it's valid, getting the user's google info there, and when we execute a query from the client asking for the current user's information we'll send it back from the server. upon which we'll store the info in our app and redirect them t our home component.
  const onSuccess = async (googleUser) => {
    // returns object with logged in user info
    // we want to send id_token to our backend on an authorization header. backend verifies the token. From there it gets the google user's profile information, which the client then asks for using the graphql 'me' query that we set up. the user's info will be sent back to the client in response to that query and the user will be logged in.
    // console.log(googleUser);
    // getAuthResponse returns an object from which we can grab the id_token
    // console.log(googleUser.getAuthResponse())
    const idToken = googleUser.getAuthResponse().id_token;
    // console.log(idToken);
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      // config object
      headers: { authorization: idToken }
    })
    // make a request to execute a query/mutation. this returns a promise
    // asking for current user data after we successfully login, and pass through the idToken from the login
    const data = await client.request(ME_QUERY)
    // console.log(data);

    dispatch({ type: "LOGIN_USER", payload: data.me })
  }

  return (
    // isSignedIn remembers if a user previously signed in
    <GoogleLogin 
      clientId={process.env.REACT_APP_OATH_CLIENT_ID} 
      onSuccess={onSuccess} 
      isSignedIn={true}
    />
  )
})

const ME_QUERY = `
  {
    me{
      _id
      name
      email
      picture
    }
  }
`
import React from 'react';

const UserContext = React.createContext({
  currentUser: null,
  isAuth: false,
  // draft will store coords of a placed pin
  draft: null,
  pins: [],
})

export default UserContext;
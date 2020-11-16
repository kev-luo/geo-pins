import React from 'react';

const UserContext = React.createContext({
  currentUser: null,
  isAuth: false,
})

export default UserContext;
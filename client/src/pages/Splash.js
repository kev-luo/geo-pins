import React, { useContext } from 'react';
import Login from '../components/Auth/Login';
import { Redirect } from 'react-router-dom';

import UserContext from '../utils/UserContext';

export default function Splash() {
  const { state } = useContext(UserContext);

  return (
    state.isAuth ? <Redirect to="/" /> : <Login />
  )
}

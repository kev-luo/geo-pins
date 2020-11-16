import React, { useContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Splash from './pages/Splash';
import UserContext from './utils/UserContext';
import reducer from './utils/reducer';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const initialState = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <UserContext.Provider value={{ state, dispatch }}>
        <Switch>
          <ProtectedRoute exact path='/' component={ Home } />
          <Route exact path='/login' component={ Splash } />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

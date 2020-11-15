import React, { useContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Splash from './pages/Splash';
import UserContext from './utils/UserContext';
import reducer from './utils/reducer';

function App() {
  const initialState = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  return (
    <Router>
      <UserContext.Provider value={{ state, dispatch }}>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route exact path='/login' component={ Splash } />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

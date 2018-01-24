import React from 'react';
import { Route } from 'react-router-dom';
import ThingsContainer from '../containers/ThingsContainer';


const App = () => (
  <div className="main">
    <div>App.jsx with Container</div>
    <Route exact path='Things' component={ThingsContainer} />

  </div>
);

export default App;

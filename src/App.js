import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import Covid from './pages/Covid';
import Home from './pages/Home';
import Weather from './pages/Weather';

function App() {
  return (
    <Switch>
      <Route component={Covid} path="/covid" exact/>
      <Route component={Weather} path="/weather"/>
      <Route component={Home} path="/" exact/>
    </Switch>
  );
}

export default App;

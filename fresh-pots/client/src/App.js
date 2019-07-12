import React from 'react';
import './App.css';
import Navbar from './Components/Navbar'
import Login from './pages/Sign/pages/Login'
import { Route, Switch } from 'react-router-dom'
import Register from './pages/Sign/pages/Register'
import Home from './pages/Home'
import Challenge from './pages/Challenge'
import Build from './pages/Buildin'


function App() {
  return (
    <Switch>
      <div>
        <Route path="/" exact component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/challenge' component={Challenge}/>
        <Route path='/buildin' component={Build}/>
      </div>
    </Switch>
  );
}

export default App;

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Navigation from './components/Navigation';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PostTicket from './components/PostTicket';
import GetTicket from './components/GetTicket';

function App() {
  return (
      <>
      <Navigation className="mr-auto"/>
        <Navbar bg="light" variant="light">          
            <Router>
              <Switch>
                  <Route path="/" component={GetTicket} exact /> 
                  <Route path="/createTicket" component={PostTicket}/>
              </Switch>
            </Router>          
        </Navbar>
      </>
  );
}

export default App;

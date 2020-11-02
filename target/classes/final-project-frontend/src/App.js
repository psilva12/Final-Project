import React from 'react';
import './App.css';
import DeleteTicket from './components/DeleteTicket';
import GetTicket from './components/GetTicket';
import PostTicket from './components/PostTicket';
import UpdateTicket from './components/UpdateTicket';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Navigation from './components/Navigation';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CreateTicket from './components/PostTicket';

function App() {
  return (
      <>
        <Navbar bg="light" variant="light">
        
          <Navigation className="mr-auto">
            <Router>
              <Switch>
                  <Route path="/" component={GetTicket} exact />
                  <Route path="/createTicket" component={CreateTicket}/>
              </Switch>
            </Router>
          </Navigation>
        </Navbar>
        <GetTicket />
        <PostTicket />
        <DeleteTicket />
        <UpdateTicket />
      </>
  );
}

export default App;

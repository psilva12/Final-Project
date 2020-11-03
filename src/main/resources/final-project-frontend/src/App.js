import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Navigation from './components/Navigation';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PostTicket from './components/PostTicket';
import GetTicket from './components/GetTicket';
import ViewTicket from './components/ViewTicket';
import DeleteTicket from './components/DeleteTicket';
import UpdateTicket from './components/UpdateTicket';

function App() {
  return (
      <>
      <Navigation />
      <Navbar className="mr-auto"/>
        <Navbar bg="light" variant="light">          
            <Router>
              <Switch>
                  <Route path="/" component={GetTicket} exact /> 
                  <Route path="/createTicket" component={PostTicket}/>
                  <Route path="/viewTicket/:id" component={ViewTicket}/>
                  <Route path="/deleteTicket/:id" component={DeleteTicket}/>
                  <Route path="/updateTicket/:id" component={UpdateTicket}/>
              </Switch>
            </Router>          
        </Navbar>
      </>
  );
}

export default App;

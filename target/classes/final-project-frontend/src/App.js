
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PostTicket from './components/PostTicket';
import GetTicket from './components/GetTicket';
import ViewTicket from './components/ViewTicket';
import DeleteTicket from './components/DeleteTicket';
import UpdateTicket from './components/UpdateTicket';
import DoneTicket from './components/DoneTicket';

function App() {
  return (
      <>
      <Navigation />       
            <Router>
              <Switch>
                  <Route path="/" component={GetTicket} exact /> 
                  <Route path="/createTicket" component={PostTicket}/>
                  <Route path="/viewTicket/:id" component={ViewTicket}/>
                  <Route path="/deleteTicket/:id" component={DeleteTicket}/>
                  <Route path="/updateTicket/:id" component={UpdateTicket}/>
                  <Route path="/doneTicket/:id/:title/:description" component={DoneTicket}/>
              </Switch>
            </Router>          
      </>
  );
}
export default App;

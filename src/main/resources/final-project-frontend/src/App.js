import React from 'react';
import './App.css';
import DeleteTicket from './components/DeleteTicket';
import GetTicket from './components/GetTicket';
import PostTicket from './components/PostTicket';
import UpdateTicket from './components/UpdateTicket';

function App() {
  return (
      <>
        <GetTicket />
        <PostTicket />
        <DeleteTicket />
        <UpdateTicket />
      </>
  );
}

export default App;

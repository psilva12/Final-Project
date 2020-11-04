import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from './images/qa_logo.svg'
import Nav from 'react-bootstrap/Nav';

const Navigation = () => {
 return(
    <Navbar bg="light">
        <Navbar.Brand href="/">
        <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="QA Logo"
        />
        </Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/createTicket">Create Ticket</Nav.Link>
        </Nav>
    </Navbar>
    );
}
 
export default Navigation;
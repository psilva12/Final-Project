import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button'

let date = new Date();

class PostTicket extends React.Component {
    state = {
        title: '',
        description: '',
        author:'',
        time:'',
        status: 0
      }

      handleTitleChange = event => {
        this.setState({title: event.target.value})
      }
    
      handleDescChange = event => {
        this.setState({description: event.target.value})
      }

      handleAuthorChange = event => {
        this.setState({author: event.target.value})
      }

     
      handleSubmit = event => {
        event.preventDefault();
        axios.post(`http://localhost:9500/createTicket`,
            {   title: this.state.title,
                description: this.state.description,
                author: this.state.author,
                time: date.toUTCString(),
                status: this.state.status
            }            
        )
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }

    render() {
        return (
          <Container>
            <br>
            </br>
            <div>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formGridTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control placeholder="Ticket Title" onChange={this.handleTitleChange}/>
                  </Form.Group>

                  <Form.Group controlId="formGridPassword">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control placeholder="Please enter your Full Name" onChange={this.handleAuthorChange}/>
                  </Form.Group>
                
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label>Description of Issue</Form.Label>
                    <Form.Control as="textarea" placeholder="Please describe your issue with as much detail as possible." onChange={this.handleDescChange}/>
                  </Form.Group>
                  <Button variant="info" type="submit">
                      Create Ticket
                  </Button>
              </Form>
            </div>
          </Container>
        );
    }
}

export default PostTicket;

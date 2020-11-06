import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button'

let date = new Date();

export default class PostSolution extends React.Component {
    state = {
        description: '',
        author:'',
        time:'',
        
        ticket: {
            id: ''
        }
    }
    
      handleDescChange = event => {
        this.setState({description: event.target.value})
      }

      handleAuthorChange = event => {
        this.setState({author: event.target.value})
      }
     
      handleSubmit = event => {

        const { match: { params } } = this.props;
        
        event.preventDefault();
        axios.post(`http://localhost:9500/createComment`,
            {   
                description: this.state.description,
                author: this.state.author,
                time: date.toUTCString(),
                ticket: {
                    id: params.id,
                }
            }            
        )
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
          axios.put(`http://localhost:9500/updateTicket/${params.id}`,
            {  
              title: params.title,
              description: params.description,
              status: 1
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
            <h3>Add a Solution</h3>
            <br></br>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control placeholder="Please enter your Full Name" onChange={this.handleAuthorChange}/>
                  </Form.Group>
                
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label>Description of Solution</Form.Label>
                    <Form.Control as="textarea" placeholder="Please describe your solution." onChange={this.handleDescChange}/>
                  </Form.Group>
                  <Button variant="info" type="submit">
                      Add Solution
                  </Button>
              </Form>
            </div>
          </Container>
        );
    }
}
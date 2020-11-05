import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button'

export default class UpdateTicket extends React.Component {

    state = {
        title: '',
        description: ''
      }

      handleTitleChange = event => {
        this.setState({title: event.target.value})
      }
    
      handleDescChange = event => {
        this.setState({description: event.target.value})
      }

      handleSubmit = event => {
        event.preventDefault();
        
        const { match: { params } } = this.props;
        
        axios.put(`http://final_project_backend:9500/updateTicket/${params.id}`,
            {   title: this.state.title,
                description: this.state.description,
                status: 0
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
          <div>
            <h3>Update Ticket</h3>
            <br></br>
            <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGridTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control placeholder="Change Ticket Title" onChange={this.handleTitleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Description of Issue</Form.Label>
                      <Form.Control as="textarea" placeholder="Change Ticket Description" onChange={this.handleDescChange}/>
                    </Form.Group>
                    <Button variant="info" type="submit">
                        Update Ticket
                    </Button>
                </Form>
          </div>
        </Container>
      )
    }
}
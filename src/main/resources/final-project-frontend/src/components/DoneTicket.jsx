import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';

export default class DoneTicket extends React.Component {

    state = {
        title: '',
        description: '',
        status: 1
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
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>Please confirm that you wish to complete and close the ticket</label>
              {' '}
              <Button variant="success" type="submit">
                Update Ticket
              </Button>                      
            </form>
          </div>
        </Container>
      )
    }
}
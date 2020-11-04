import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

const ViewTicket = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const { id } = useParams();
    
    handleSubmit = event => {
        event.preventDefault();
        axios.post(`http://localhost:9500/createComment`,
            {   
                description: this.state.description,
                author: this.state.author,
                time: date.toUTCString(),
                ticket: {
                    id: {$id}
                }
            }            
        )
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }

    useEffect( () => {
        axios.get(`http://localhost:9500/getTicketById/${id}` ,
        {
            id: '',
            headers:{
                'Access-Control-Allow-Origin':'*'
            }
        }
    )
        .then(res => res)
        .then(
            (res) => {
                setIsLoaded(true);
                console.log(res.data);
                setItems(res.data)
            },
            (error) => {
                setIsLoaded(true);
                setError(error)
            }
        )
},[]);
if(error){
    return <div> Oops... something has happened... {error.message}</div>
}
else if(!isLoaded){
    return <div> Please wait... we are loading your information</div>
}else{
    return(
        <div>
            <Container>
                <div>
                    <Card border="primary" style={{ width: '60rem' }}>
                        <Card.Body>
                        <Card.Title>{items.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{items.author}</Card.Subtitle>
                        <Card.Text>
                            {items.description}
                        </Card.Text>
                        <Button variant="warning" href={`/updateTicket/${items.id}`}> 
                            Update Ticket
                        </Button>
                        {' '}
                        <Button variant="danger" href={`/deleteTicket/${items.id}`}> 
                            Delete Ticket
                        </Button>
                        {' '}
                        <Button variant="success" href={`/doneTicket/${items.id}/${items.title}/${items.description}`}>
                            Done
                        </Button>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">{items.time}</small>
                        </Card.Footer> 
                    </Card>
                    <br></br>
            
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control placeholder="Please enter your Full Name." onChange={this.handleAuthorChange}/>
                  </Form.Group>
                
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label>Description of Solution</Form.Label>
                    <Form.Control as="textarea" placeholder="Please describe your solution to the ticket." onChange={this.handleDescChange}/>
                  </Form.Group>
                  <Button variant="info" type="submit">
                      Add Solution
                  </Button>
              </Form>
              </div>
            </Container>
        </div>
    )
    }
}

export default ViewTicket;

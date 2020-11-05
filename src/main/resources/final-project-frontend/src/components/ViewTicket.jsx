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
    const [solutions, setSolutions] = useState([]);

    useEffect( () => {
        axios.get(`http://localhost:9500/getTicketById/${id}` ,
        {
            id: '',
            // comments: {
            //     author: '',
            //     description: '',
            //     time: '',
            // },
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
                setSolutions(res.data.comments)
                
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
            {console.log(solutions)}
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
                        <Button variant="info" href={`/createSolution/${items.id}/${items.title}/${items.description}`}>
                            Add Solution
                        </Button>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">{items.time}</small>
                        </Card.Footer> 
                    </Card>
                    <br></br>
              </div>
              {/* {console.log(items.comments)} */}

              
                
              {solutions.map( (hi) => (  
              <div>
                    <Card border="primary" style={{ width: '60rem' }}>
                        <Card.Body>
                        <Card.Title>Solution</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{hi.author}</Card.Subtitle>
                        <Card.Text>
                            {hi.description}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">{hi.time}</small>
                        </Card.Footer> 
                    </Card>
                    <br></br>
              </div>
              ))}
            </Container>
        </div>
    )
    }
}

export default ViewTicket;

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import TimeAgo from 'react-timeago'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

const GetTicket = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect( () => {
        axios.get("http://35.176.172.62:9500/getTickets" ,
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
            <Container>
            <div>
                
                <Table>
                <td>
                <h3> Queue </h3>
                {items.filter(ticket =>ticket.status === false).map( (hi) => (
                    <div>
                        <Card border="primary" style={{ width: '18rem' }}>
                            <Card.Body>
                            <Card.Title>{hi.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{hi.author}</Card.Subtitle>
                            <Card.Text>
                                {hi.description}
                            </Card.Text>
                            <Button variant="info" href={`/viewTicket/${hi.id}`}>
                                View Ticket
                            </Button>
                            {' '}
                            <Button variant="success" href={`/doneTicket/${hi.id}/${hi.title}/${hi.description}`}>
                                Done
                            </Button>
                            </Card.Body> 
                            <Card.Footer>
                                <small className="text-muted"><TimeAgo date={hi.time}>{({ value }) => <h2>{value}</h2>}</TimeAgo></small>
                            </Card.Footer>  
                        </Card>
                        <br></br> 
                    </div>
                ))}
                </td>

                
                
                <td>
                <h3> Done </h3>
                {items.filter(ticket =>ticket.status === true).map( (hi) => (
                    <div>
                        <Card border="success" style={{ width: '18rem' }}>
                            <Card.Body>
                            <Card.Title>{hi.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{hi.author}</Card.Subtitle>
                            <Card.Text>
                                {hi.description}
                            </Card.Text>
                            <Button variant="info" href={`/viewTicket/${hi.id}`}>
                                View Ticket
                            </Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted"><TimeAgo date={hi.time}>{({ value }) => <h2>{value}</h2>}</TimeAgo></small>
                            </Card.Footer> 
                        </Card> 
                        <br></br>
                    </div>
                ))} 
                </td>
                </Table>
                
            </div>
            </Container>
        )
    }
}

export default GetTicket;

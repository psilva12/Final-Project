import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import TimeAgo from 'react-timeago'
import ViewTicket from './ViewTicket'
import CardColumns from 'react-bootstrap/CardColumns'

const GetTicket = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect( () => {
        axios.get("http://localhost:9500/getTickets" ,
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
                 <p> Queue </p>
                 <CardColumns>
                {items.filter(ticket =>ticket.status === false).map( (hi) => (
                    <div>
                        <Card border="primary" style={{ width: '18rem' }}>
                            <Card.Body>
                            <Card.Title>{hi.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{hi.author}</Card.Subtitle>
                            <Card.Text>
                                {hi.description}
                            </Card.Text>
                            <Card.Text>
                            <TimeAgo date={hi.time}>{({ value }) => <h2>{value}</h2>}</TimeAgo>
                            </Card.Text>
                            <button>
                            <a href={`/viewTicket/${hi.id}`}> View Ticket</a>
                            </button>
                            <button>
                            <a href={`/doneTicket/${hi.id}/${hi.title}/${hi.description}`}> Done </a>
                        </button>
                            </Card.Body> 
                        </Card> 
                        <br></br>
                    </div>
                ))} 
                </CardColumns> 
                    <p> Done </p>
                <CardColumns>
                {items.filter(ticket =>ticket.status === true).map( (hi) => (
                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                            <Card.Title>{hi.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{hi.author}</Card.Subtitle>
                            <Card.Text>
                                {hi.description}
                            </Card.Text>
                            <Card.Text>
                            <TimeAgo date={hi.time}>{({ value }) => <h2>{value}</h2>}</TimeAgo>
                            </Card.Text>
                            <button>
                            <a href={`/viewTicket/${hi.id}`}> View Ticket</a>
                            </button>
                            </Card.Body> 
                        </Card> 
                        <br></br>
                    </div>
                ))} 
                </CardColumns> 
            </div>
        )
    }
}

export default GetTicket;

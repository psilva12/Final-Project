import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import TimeAgo from 'react-timeago'

const ViewTicket = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect( () => {
        axios.get("http://localhost:9500/getTicketById${this.state.id}" ,
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
                {items.map( (hi) => (
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
                            </Card.Body> 
                        </Card> 
                        <br></br>
                    </div>
                ))} 
            </div>
        )
    }
}

export default ViewTicket;

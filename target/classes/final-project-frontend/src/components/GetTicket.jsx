import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'

import TimeAgo from 'react-timeago'


const GetTicket = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
 

    useEffect( () => {
        axios.get("http://localhost:9500/getTickets" ,
            {
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
    const initialDate = new Date();
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
                            </Card.Body> 
                            {/* Button to add to done and to view card.
                            Time ago underneath */}
                        </Card> 
                        <br></br>
                    </div>
                ))} 
            </div>
        )
    }
}

export default GetTicket;
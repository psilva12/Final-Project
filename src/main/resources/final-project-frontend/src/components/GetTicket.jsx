import React, {useState, useEffect} from 'react';
import axios from 'axios';

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

    if(error){
        return <div> Oops... something has happened... {error.message}</div>
    }
    else if(!isLoaded){
        return <div> Please wait... we are loading your information</div>
    }else{
        return(
            <ul>
                {items.map( (hi) => (
                    <li key={hi.id}> {hi.author} {hi.description} {hi.title}</li>
                ))}
            </ul>
        )
    }
}

export default GetTicket;

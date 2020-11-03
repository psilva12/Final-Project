import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeleteTicket = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect( () => {
      axios.delete(`http://localhost:9500/deleteTicket/${id}` ,
      {
          id: '',
          headers:{
              'Access-Control-Allow-Origin':'*'
          }
      }
  )
    },[]);

    return (
      <p>Deleted</p>
    )
  }
  
export default DeleteTicket;
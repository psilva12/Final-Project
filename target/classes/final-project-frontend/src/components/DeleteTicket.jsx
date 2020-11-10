import React, {useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeleteTicket = () => {
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
      <p>The ticket has been deleted</p>
    )
  }
  
export default DeleteTicket;

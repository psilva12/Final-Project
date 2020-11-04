import React, {useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeleteTicket = () => {
  const { id } = useParams();

  useEffect( () => {
      axios.delete(`http://35.178.22.230:9500/deleteTicket/${id}` ,
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
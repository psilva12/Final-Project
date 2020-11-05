import React, {useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeleteTicket = () => {
  const { id } = useParams();

  useEffect( () => {
      axios.delete(`http://35.197.221.127:9500/deleteTicket/${id}` ,
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
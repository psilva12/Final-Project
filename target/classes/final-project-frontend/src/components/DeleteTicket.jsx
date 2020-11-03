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
// export default class DeleteTicket extends React.Component {
//   state = {
//     id:null,
//   }

//   handleChange = event => {
//     this.setState({ id: event.target.value });
//   }

//   handleSubmit = event => {
    
//     event.preventDefault();

//     axios.delete(`http://localhost:9500/deleteTicket/${this.state.id}`)
//       .then(res => {
//         console.log(res);
//         console.log(res.data);
//       })
//   }

    return (
      // <div>
      //   <form onSubmit={this.handleSubmit}>
      //     <label>
      //       Ticket ID:
      //       <input type="text" name="id" onChange={this.handleChange} />
      //     </label>
      //     <button type="submit">Delete</button>
      //   </form>
      // </div>
      <p>Deleted</p>
    )
  }
  
export default DeleteTicket;
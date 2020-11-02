import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GetTicket from './GetTicket';

class PostTicket extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         ticketId: null
    //     };
    // }

    // componentDidMount() {
    //     // Simple POST request with a JSON body using axios
    //     const ticketData = {   title: 'yolo',
    //                         description: '150g',
    //                         author:'bj',
    //                         time:'12',
    //                         status: false };
    //     axios.post('http://localhost:9500/createTicket', ticketData)
    //         .then(response => this.setState({ ticketId: response.data.id }));
    // }
    state = {
        title: '',
        description: '',
        author:'',
        time:'12 o clock',
        status: false
      }
    

      handleTitleChange = event => {
        this.setState({title: event.target.value})
      }
    
      handleDescChange = event => {
        this.setState({description: event.target.value})
      }

      handleAuthorChange = event => {
        this.setState({author: event.target.value})
      }

      handleSubmit = event => {
        event.preventDefault();
        
        axios.post(`http://localhost:9500/createTicket`,
            {   title: this.state.title,
                description: this.state.description,
                author: this.state.author,
                time: this.state.time,
                status: this.state.status
            }
        )
          .then(res => {
            console.log(res);
            console.log(res.data);
          })

      }

    render() {
        // const { ticketId } = this.state;
        // return (
        //     <div className="card text-center m-3">
        //         <h5 className="card-header">Simple POST Request</h5>
        //         <div className="card-body">
        //             Returned Id: {ticketId}
        //         </div>
        //     </div>


        return (
            <div>
              <form onSubmit={this.handleSubmit}>
                  <label>
                    Title:
                  </label>
                    <input type="text" name="title" onChange={this.handleTitleChange} />
                  <br>
                  </br>
                  <label>
                    Description:
                  </label>
                    <input type="text" name="description" onChange={this.handleDescChange} />
                  <br>
                  </br>
                  <label>
                    Author
                  </label>
                    <input type="text" name="title" onChange={this.handleAuthorChange} />
                  <br>
                  </br>
                                  
                <button type="submit">Create Ticket</button>
              </form>
            </div>
          );
        
    }
}

export default PostTicket;
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GetTicket from './GetTicket';

let date = new Date();

class PostTicket extends React.Component {
    state = {
        title: '',
        description: '',
        author:'',
        time:'',
        status: 0
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
                time: date.toUTCString(),
                status: this.state.status
            }            
        )
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }

    render() {
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
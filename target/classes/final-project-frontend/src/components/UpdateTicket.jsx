import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default class UpdateTicket extends React.Component {

    state = {
        id: '',
        title: '',
        description: ''
      }
    
      handleChange = event => {
        this.setState({ id: event.target.value});
      }

      handleTitleChange = event => {
        this.setState({title: event.target.value})
      }
    
      handleDescChange = event => {
        this.setState({description: event.target.value})
      }

      handleSubmit = event => {
        event.preventDefault();
        
        axios.put(`http://localhost:9500/updateTicket/${this.state.id}`,
            {   title: this.state.title,
                description: this.state.description
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
                Ticket ID:
              </label>
                <input type="text" name="id" onChange={this.handleChange} />
              <br>
              </br>
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
            
            <button type="submit">Update</button>
          </form>
        </div>
      )
    }
}
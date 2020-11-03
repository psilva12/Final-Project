import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default class UpdateTicket extends React.Component {

    state = {
        title: '',
        description: ''
      }
    
      // handleChange = event => {
      //   this.setState({ id: event.target.value});
      // }

      handleTitleChange = event => {
        this.setState({title: event.target.value})
      }
    
      handleDescChange = event => {
        this.setState({description: event.target.value})
      }

      handleSubmit = event => {
        event.preventDefault();

        
        const { match: { params } } = this.props;
        
        axios.put(`http://localhost:9500/updateTicket/${params.id}`,
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
                New title:
              </label>
                <input type="text" name="title" onChange={this.handleTitleChange} />
              <br>
              </br>
              <label>
                New description:
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
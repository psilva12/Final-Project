import React from 'react';
import axios from 'axios';

export default class DoneTicket extends React.Component {

    state = {
        title: '',
        description: '',
        status: 1
      }
    

      handleTitleChange = event => {
        this.setState({title: event.target.value})
      }
    
      handleDescChange = event => {
        this.setState({description: event.target.value})
      }

      handleSubmit = event => {
        event.preventDefault();

        const { match: { params } } = this.props;
        
        axios.put(`http://0.0.0.0:9500/updateTicket/${params.id}`,
            {  
              title: params.title,
              description: params.description,
              status: 1
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
            <label>Please confirm that you wish to complete and close the ticket</label>
            {' '}                      
            <button type="submit">Done</button>
          </form>
        </div>
      )
    }
}
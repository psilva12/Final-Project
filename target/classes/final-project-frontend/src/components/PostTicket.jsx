import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GetTicket from './GetTicket';



class PostTicket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticketId: null
        };
    }

    componentDidMount() {
        // Simple POST request with a JSON body using axios
        const ticketData = {   title: 'yolo',
                            description: '150g',
                            author:'bj',
                            time:'12',
                            status: false };
        axios.post('http://localhost:9500/createTicket', ticketData)
            .then(response => this.setState({ ticketId: response.data.id }));
    }

    render() {
        const { ticketId } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">Simple POST Request</h5>
                <div className="card-body">
                    Returned Id: {ticketId}
                </div>
            </div>
        );
    }
}

export default PostTicket;
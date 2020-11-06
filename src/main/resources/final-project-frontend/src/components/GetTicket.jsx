import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import TimeAgo from 'react-timeago'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

let topic="empty";

const GetTicket = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchTerm2, setSearchTerm2] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const handleChangeBack = event => {
        setSearchResults(items.filter(ticket =>ticket.topic.includes("Back")));
        };
        const handleChangeDev = event => {
        setSearchResults(items.filter(ticket =>ticket.topic.includes("Dev")));
        };
        const handleChangeFront = event => {
        setSearchResults(items.filter(ticket =>ticket.topic.includes("Front")
        ));
        };
        const handleChangeNone = event => {
        setSearchResults(items);
        };
        const handleChangeOther = event => {
        setSearchResults(items.filter(ticket =>ticket.topic.includes("Other")));
        };
        const handleChangeSearch = event => {
        setSearchTerm2(event.target.value);
        };

    useEffect( () => {
        axios.get("http://localhost:9500/getTickets" ,
            {
                id: '',
                headers:{
                    'Access-Control-Allow-Origin':'*'
                }
            }
        )
            .then(res => res)
            .then(
                (res) => {
                    setIsLoaded(true);
                    console.log(res.data);
                    setItems(res.data)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    
                }
            )
                const results = items.filter(ticket =>ticket.topic.includes(searchTerm)
                );
                setSearchResults(results);

                const results2 = items.filter(ticket =>ticket.description.toLowerCase().includes(searchTerm2.toLowerCase())
                );
                setSearchResults(results2);
    },[searchTerm,searchTerm2]);
  
    if(error){
        return <div> Oops... something has happened... {error.message}</div>
    }
    else if(!isLoaded){
        return <div> Please wait... we are loading your information</div>
    }else{
         return(
            <Container>
            <div>
            <Form>
            <Form.Row>
            <Col>
                <DropdownButton id="dropdown-basic-button" title="Filter By topic"
                value={searchTerm}>
                <Dropdown.Item onClick={handleChangeNone} >None</Dropdown.Item>
                <Dropdown.Item onClick={handleChangeDev} >Dev-Ops</Dropdown.Item>
                <Dropdown.Item onClick={handleChangeBack} >Back-End</Dropdown.Item>
                <Dropdown.Item onClick={handleChangeFront} >Front-End</Dropdown.Item>
                <Dropdown.Item onClick={handleChangeOther} >Other</Dropdown.Item>
                </DropdownButton>
            <br></br>
            </Col>
            <Col>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm2}
                    onChange={handleChangeSearch}
                />
            </Col>
            </Form.Row>
            </Form>
                <Table>
                <td>
                <h3> Queue </h3>
                {searchResults.filter(ticket =>ticket.status === false ).map( (hi) => (
                    <div>
                        <Card border="primary" style={{ width: '18rem' }}>
                        <Card.Header>{hi.topic}</Card.Header>
                            <Card.Body>
                            <Card.Title>{hi.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{hi.author}</Card.Subtitle>
                            <Card.Text>
                                {hi.description}
                            </Card.Text>
                            <Button variant="info" href={`/viewTicket/${hi.id}`}>
                                View Ticket
                            </Button>
                            </Card.Body> 
                            <Card.Footer>
                                <small className="text-muted"><TimeAgo date={hi.time}>{({ value }) => <h2>{value}</h2>}</TimeAgo></small>
                            </Card.Footer>  
                        </Card>
                        <br></br> 
                    </div>
                ))}
                </td>

                
                
                <td>
                <h3> Done </h3>
                {searchResults.filter(ticket =>ticket.status === true).map( (hi) => (
                    <div>
                        <Card border="success" style={{ width: '18rem' }}>
                        <Card.Header>{hi.topic}</Card.Header>
                            <Card.Body>
                            <Card.Title>{hi.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{hi.author}</Card.Subtitle>
                            <Card.Text>
                                {hi.description}
                            </Card.Text>
                            <Button variant="info" href={`/viewTicket/${hi.id}`}>
                                View Ticket
                            </Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted"><TimeAgo date={hi.time}>{({ value }) => <h2>{value}</h2>}</TimeAgo></small>
                            </Card.Footer> 
                        </Card> 
                        <br></br>
                    </div>
                ))} 
                </td>
                </Table>
                
            </div>
            </Container>
        )
    }
}

export default GetTicket;

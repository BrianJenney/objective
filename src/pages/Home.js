import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

export default class Home extends Component {
    render() {
        return (
            <Container>
                <Header as='h2'>Home Page</Header>
                <Link to="/terms">Click to read disclaimer</Link>
            </Container>
        ) 
    }
}

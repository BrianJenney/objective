import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Menu } from 'semantic-ui-react';

export default class Home extends Component {
    render() {
        return (
            <Container>
                <Header as='h2'>Home Page</Header>
                <Menu>
                    <Menu.Item>
                        <Link to="/about">About Us</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/terms">Terms & Conditions</Link>
                    </Menu.Item>
                </Menu>
            </Container>
        ) 
    }
}

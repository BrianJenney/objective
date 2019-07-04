import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class Login extends Component {
  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">Login</Header>
          <Segment>
            <Form size="large">
              <Form.Input fluid icon="user" iconPosition="left" placeholder="Email address" />
              <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />
              <Button color="blue" fluid size="large">Login</Button>
            </Form>
          </Segment>
          <Message>Not registered yet? <Link>Sign Up</Link></Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
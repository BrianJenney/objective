import React from 'react';
import { connect } from 'react-redux';

import { Container, Header, Grid, Card } from 'semantic-ui-react';

import { requestFetchAccount} from '../modules/account/actions';

class Account extends React.Component {
  componentWillMount() {
    this.props.requestFetchAccount('5cdc7405da53494ee0f3bafe');
  }

  render() {
    if (!this.props.account.users) {
      return (<div></div>);
    }
    let users = this.props.account.users;
    var userNum = 1;
    let userList = Object.values(users).map((user) => (
      <Grid.Column className="card" key={userNum++}>
      <Card>
        <Card.Content>
          <Card.Header>{user.firstName} {user.lastName}</Card.Header>
          <Card.Description>
            <p>Email: {user.email}</p>
            <p>Preferred Contact Method: {user.contactPreferences.preferred}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
    ));

    return (
      <Container>
        <Header as='h2'>Account Info</Header>
        <p>Status: {this.props.account.status}</p>
        <Grid>
          {userList}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    stompClient: state.stomp.client,
    account: state.account
  }
};

const mapDispatchToProps = {
  requestFetchAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
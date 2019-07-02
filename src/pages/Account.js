import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import { requestFetchUsers } from '../modules/user/actions';

class Account extends React.Component {
  componentWillMount() {
    this.props.requestFetchUsers(process.env.REACT_APP_STORE_CODE);
  }

  render() {
    return (
      <Container>
        <Header as='h2'>Account Info</Header>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    stompClient: state.stomp.client,
    users: state.users
  }
};

const mapDispatchToProps = {
  requestFetchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
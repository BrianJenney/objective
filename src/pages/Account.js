import React from 'react';
import { connect } from 'react-redux';

import { requestFetchAccount} from '../modules/account/actions';
import Container from '@material-ui/core/Container';

class Account extends React.Component {
  componentDidMount() {
    this.props.requestFetchAccount('5cdc7405da53494ee0f3bafe');
  }

  render() {
    if (!this.props.account.users) {
      return (<div></div>);
    }
    let users = this.props.account.users;
    var userNum = 1;
    let userList = Object.values(users).map((user) => (
      <div className="card" key={userNum++}>
        <h2>{user.firstName} {user.lastName}</h2>
        <p>Email: {user.email}</p>
        <p>Preferred Contact Method: {user.contactPreferences.preferred}</p>
      </div>
    ));

    return (
      <Container>
        <h2>Account Info</h2>
        <p>Status: {this.props.account.status}</p>
        <div>
          {userList}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    stompClient: state.stomp.client,
    account: state.account
  };
};

const mapDispatchToProps = {
  requestFetchAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
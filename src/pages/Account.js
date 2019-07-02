import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import { requestFetchAccount} from '../modules/account/actions';

class Account extends React.Component {
  componentWillMount() {
    this.props.requestFetchAccount(process.env.REACT_APP_STORE_CODE);
  }

  render() {
    return (
      <Container>
        <Header as='h2'>Account Info</Header>
        <p>{this.props.account}</p>
      </Container>
    )
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
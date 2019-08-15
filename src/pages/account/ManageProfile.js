import React from 'react';
import { connect } from 'react-redux';

import {
  requestFetchAccount,
  requestPatchAccount
} from '../../modules/account/actions';
import store from '../../store';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const pStyle = {
  padding: 20,
  textAlign: 'center'
};
const inputStyle = {
  margin: 20
};

class ManageProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      number: ''
    };
  }

  componentDidMount() {
    this.props.requestFetchAccount('5cdc7405da53494ee0f3bafe');
    console.log('******************MOUNTED****************************');
  }

  handleSubmit = event => {
    event.preventDefault();
    let user = this.props.account;
    let patches = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneBook: {
        defaultNum: this.state.number
      }
    };
    store.dispatch(requestPatchAccount(user._id, patches));
  };

  handleInputChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    });
  };

  render() {
    if (!this.props.account.contactPreferences) {
      return <div>No Account</div>;
    }

    let user = this.props.account;

    return (
      <Container>
        <Typography variant="h3" gutterBottom>
          Manage Profile
        </Typography>
        <Link variant="button" color="textPrimary">
          <RouterLink to="/account">Back</RouterLink>
        </Link>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper style={pStyle}>
                <Typography variant="h3" gutterBottom>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Email: {user.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Phone: {user.phoneBook.defaultNum}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Preferred Contact Method: {user.contactPreferences.preferred}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper style={pStyle}>
                <Typography variant="h3" gutterBottom>
                  Edit Info Here
                </Typography>
                <TextField
                  id="outlined-name"
                  label="First Name"
                  margin="normal"
                  variant="outlined"
                  style={inputStyle}
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                />
                <TextField
                  id="outlined-name"
                  label="Last Name"
                  margin="normal"
                  variant="outlined"
                  style={inputStyle}
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                />
                <TextField
                  id="outlined-name"
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  style={inputStyle}
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <TextField
                  id="outlined-name"
                  label="Phone Number"
                  margin="normal"
                  variant="outlined"
                  style={inputStyle}
                  name="number"
                  value={this.state.number}
                  onChange={this.handleInputChange}
                />
                <Button
                  href="#"
                  color="primary"
                  variant="outlined"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </form>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProfile);

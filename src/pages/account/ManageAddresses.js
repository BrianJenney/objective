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
      defaultAddress: {
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        country: this.state.country
      }
    };
    store.dispatch(requestPatchAccount(user._id, patches));
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
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
          Manage Addresses
        </Typography>
        <Link variant="button" color="textPrimary">
          <RouterLink to="/account">Back</RouterLink>
        </Link>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper style={pStyle}>
                <Typography variant="h6" gutterBottom>
                  Address
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.defaultAddress.address1}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.defaultAddress.address2}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.defaultAddress.city}, {user.defaultAddress.state}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.defaultAddress.zipcode} {user.defaultAddress.country}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper style={pStyle}>
                <Typography variant="h3" gutterBottom>
                  Edit Address Here
                </Typography>
                <TextField
                  id="outlined-name"
                  label="Address"
                  margin="normal"
                  variant="outlined"
                  style={inputStyle}
                  name="address1"
                  value={this.state.address1}
                  onChange={this.handleInputChange}
                />
                <TextField
                  id="outlined-name"
                  label="Address 2"
                  margin="normal"
                  variant="outlined"
                  style={inputStyle}
                  name="address2"
                  value={this.state.address2}
                  onChange={this.handleInputChange}
                />
                <TextField
                  id="outlined-name"
                  label="City"
                  margin="normal"
                  variant="outlined"
                  style={inputStyle}
                  name="city"
                  value={this.state.city}
                  onChange={this.handleInputChange}
                />
                <TextField
                  id="outlined-name"
                  label="State"
                  margin="normal"
                  variant="outlined"
                  style={inputStyle}
                  name="state"
                  value={this.state.state}
                  onChange={this.handleInputChange}
                />
                <TextField
                  id="outlined-name"
                  label="Zip Code"
                  margin="normal"
                  variant="outlined"
                  style={inputStyle}
                  name="zipcode"
                  value={this.state.zipcode}
                  onChange={this.handleInputChange}
                />
                <TextField
                  id="outlined-name"
                  label="Country"
                  margin="normal"
                  variant="outlined"
                  style={inputStyle}
                  name="country"
                  value={this.state.country}
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

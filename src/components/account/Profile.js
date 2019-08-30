import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import { omit } from 'lodash';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {
  requestFetchAccount,
  requestPatchAccount
} from '../../modules/account/actions';
import store from '../../store';
import { InputField } from '../form-fields';

const pStyle = {
  padding: 20,
  textAlign: 'center'
};
const schema = object().shape({
  firstName: string(),
  lastName: string(),
  email: string(),
  phoneNumber: string()
});
const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: ''
};

class AccountProfile extends React.Component {
  componentDidMount() {
    this.props.requestFetchAccount('5cdc7405da53494ee0f3bafe');
    console.log('******************MOUNTED****************************');
  }

  renderForm = () => {
    return (
      <Form>
        <Field label="First Name" name="firstName" component={InputField} />
        <Field label="Last Name" name="lastName" component={InputField} />
        <Field label="Email" name="email" component={InputField} />
        <Field label="Phone Number" name="phoneNumber" component={InputField} />
        <Button type="submit">Submit</Button>
      </Form>
    );
  };

  handleSubmit = values => {
    const { account: user } = this.props;
    const payload = {
      ...values,
      phoneBook: {
        defaultNum: values.phoneNumber
      }
    };

    store.dispatch(
      requestPatchAccount(user._id, omit(payload, ['phoneNumber']))
    );
  };

  render() {
    const { account: user } = this.props;

    if (!user.contactPreferences) {
      return <div>No Account</div>;
    }

    return (
      <Container>
        <Typography variant="h3" gutterBottom>
          Manage Profile
        </Typography>

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
              <Formik
                initialValues={INITIAL_VALUES}
                onSubmit={this.handleSubmit}
                validationSchema={schema}
                render={this.renderForm}
              />
            </Paper>
          </Grid>
        </Grid>
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
)(AccountProfile);

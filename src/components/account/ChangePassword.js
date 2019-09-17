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
import { requestPatchAccount } from '../../modules/account/actions';
import store from '../../store';
import { InputField } from '../form-fields';
import {fonts} from '../Theme/fonts';

const schema = object().shape({
  currentPassword: string().required('Your current password is required'),
  newPassword1: string().required('Both password fields are required.'),
  newPassword2: string().required('Both password fields are required.')
});

class ChangePassword extends React.Component {
  renderForm = () => {
    return (
      <Container>
        <Form style={{fontFamily: fonts.smallHeader, fontSize: 26}}>
          <Grid container spacing={2}>

          <Grid item xs={12}>
            <Field
              label="Current Password"
              name="currentPassword"
              type="password"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="New Password"
              name="newPassword1"
              type="password"
              helperText="Must be at least 6 characters"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              label="Confirm New Password"
              name="newPassword2"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Button style={{fontFamily: fonts.smallHeader, fontSize: 16, color: 'white', background: 'black', marginTop: 10}} type="submit">Change Password</Button>
          </Grid>
          </Grid>
        </Form>
      </Container>
    );
  };

  handleSubmit = values => {
    // if (values.newPassword1 !== values.newPassword2) {
    //   return false;
    // }
    store.dispatch(
      requestPatchAccount(this.props.account.data.account_jwt, values)
    );
  };

  render() {
    const { account } = this.props;

    const INITIAL_VALUES = {};

    if (!account.data.account_jwt) {
      return <div>No Account</div>;
    }

    return (
      <Container align='left' style={{paddingLeft: 0}}>
        <Typography style={{fontSize: 18, fontFamily: fonts.smallHeader, marginTop: 25, marginLeft: 27}} variant="h3" gutterBottom>
          CHANGE PASSWORD
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

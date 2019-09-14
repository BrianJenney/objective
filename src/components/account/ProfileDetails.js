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

const pStyle = {
  padding: 20
};
const schema = object().shape({
  firstName: string(),
  lastName: string(),
  email: string().email('Please enter a valid email.')
});

class ProfileDetails extends React.Component {
  renderForm = () => {
    return (
      <Form style={{fontFamily: fonts.smallHeader, fontSize: 26}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Field label="First Name" name="firstName" component={InputField} />
          </Grid>
          <Grid item xs={6}>
            <Field label="Last Name" name="lastName" component={InputField} />
          </Grid>
          <Grid item xs={12}>
            <Field label="Email" name="email" component={InputField} />
          </Grid>
          {/* <Grid item xs={12}>
            <Field label="Phone Number" name="phone" component={InputField} />
          </Grid> */}
          <Grid item xs={12}>
            <Button style={{fontFamily: fonts.smallHeader, fontSize: 16, color: 'white', background: 'black', marginTop: 10}} type="submit">Save Changes</Button>
          </Grid>
        </Grid>
      </Form>
    );
  };

  handleSubmit = (values) => {
    store.dispatch(requestPatchAccount(this.props.account.data.account_jwt, values));
  };

  render() {
    const { account } = this.props;

    const INITIAL_VALUES = {
      firstName: account.data.firstName,
      lastName: account.data.lastName,
      email: account.data.email
      // phone:account.data.phone
    };

    if (!account.data.account_jwt) {
      return <div>No Account</div>;
    }

    return (
      <Container align='left'>
        <Typography style={{fontSize: 48, fontFamily: fonts.header}} variant="h1" gutterBottom>
          Your Profile
        </Typography>
        <Typography style={{fontSize: 18, fontFamily: fonts.smallHeader}} variant="h3" gutterBottom>
          NAME {'&'} EMAIL
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
)(ProfileDetails);

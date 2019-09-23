import React from 'react';
import { connect } from 'react-redux';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { fonts } from '../../components/Theme/fonts.js';
import { Button } from '../common';
import { requestPatchAccount } from '../../modules/account/actions';
import store from '../../store';
import { InputField } from '../form-fields';

const schema = object().shape({
  firstName: string(),
  lastName: string(),
  email: string().email('Please enter a valid email.')
});

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: fonts.header,
    fontSize: 48,
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      fontSize: '36px'
    }
  },
  info: {
    fontFamily: 'p22-underground, sans-serif',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 'normal',
    marginBottom: 20
  },
  subTexts: {
    fontFamily: fonts.body,
    fontSize: '21px',
    padding: 10
  },
  inline: {
    display: 'flex'
  },
  root: {
    width: '100%',
    maxWidth: 360
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  box: {
    backgroundColor: '#003833',
    '&:hover': {
      backgroundColor: '#003833'
    }
  },
  item: {
    color: 'white'
  }
}));

const ProfileDetails = props => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const { account } = props;
  const INITIAL_VALUES = {
    firstName: account.data.firstName,
    lastName: account.data.lastName,
    email: account.data.email,
    phone: account.data.phone
  };
  if (!account.data.account_jwt) {
    return <div>No Account</div>;
  }
  const handleSubmit = values => {
    store.dispatch(requestPatchAccount(props.account.data.account_jwt, values));
  };
  const renderForm = () => {
    return (
      <Form>
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
          <Grid item xs={xs ? 12 : 4}>
            <Button mt={2} mp={3} fullWidth type="submit">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Form>
    );
  };
  return (
    <div className="account-profile">
      <Typography className={classes.title} variant="h1" gutterBottom>
        Your Profile
      </Typography>
      <Typography className={classes.info} variant="h3" gutterBottom>
        NAME {'&'} EMAIL
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
            validationSchema={schema}
            render={renderForm}
          />
        </Grid>
      </Grid>
    </div>
  );
};
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

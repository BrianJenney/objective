import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import { omit } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
    requestGetAccount,
    requestPatchAccount
} from '../../modules/account/actions';
import store from '../../store';
import { InputField } from '../../components/form-fields';

const pStyle = {
    padding: 20,
    textAlign: 'center',
};
const schema = object().shape({
    firstName: string(),
    lastName: string(),
    address1: string(),
    address2: string(),
    city: string(),
    state: string(),
    zipcode: string(),
    country: string()
});
const INITIAL_VALUES = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    country: ''
};

class AddAddress extends React.Component {
    componentDidMount() {
        this.props.requestFetchAccount('5cdc7405da53494ee0f3bafe');
        console.log('******************MOUNTED****************************');
    }

    renderForm = () => {
        return (
            <Form>
                <Field label="First Name" name="firstName" component={InputField} />
                <Field label="Last Name" name="lastName" component={InputField} />
                <Field label="Address" name="address1" component={InputField} />
                <Field label="Address 2" name="address2" component={InputField} />
                <Field label="City" name="city" component={InputField} />
                <Field label="State" name="state" component={InputField} />
                <Field label="Zipcode" name="zipcode" component={InputField} />
                <Field label="Country" name="country" component={InputField} />
                <Button type="submit">Submit</Button>
            </Form>
        );
    };

    handleSubmit = values => {
        const { account: user } = this.props;

        let existing = user.addressBook;
        existing.push(values);
        existing[existing.length - 1].isDefault = false;

        // onSubmit check to see if the address exist
        // if address exist throw error

        const payload = {
            addressBook: existing
        }

        store.dispatch(
            requestPatchAccount(user._id, payload)
        );

        window.location = '/saved-addresses';
    };

    render() {
        const { account: user } = this.props;

        if (!user.contactPreferences) {
            return <div>No Account</div>;
        }

        return (
            <Container>
                <Link variant="button" color="textPrimary">
                    <RouterLink to="saved-addresses">Back</RouterLink>
                </Link>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper style={pStyle}>
                            <Typography variant="h3" gutterBottom>
                                Add a new address
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
    requestGetAccount
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddAddress);


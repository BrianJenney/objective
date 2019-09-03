import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import { omit, isNil } from 'lodash';
import { Link as RouterLink, withRouter } from 'react-router-dom';
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
import { useScrollTrigger } from '@material-ui/core';

const pStyle = {
    padding: 20,
    textAlign: 'center'
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

const getInitialValues = defaultValues => ({
    ...INITIAL_VALUES,
    ...defaultValues
});

class EditAddress extends React.Component {
    componentDidMount() {
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
                <Button type="submit">Save Changes</Button>
            </Form>
        );
    };

    handleSubmit = values => {
        const { account, match: { params } } = this.props;
        const { addressKey } = params;

        let existing = account.addressBook;
        existing.splice(addressKey, 1, values)

        const payload = {
            addressBook: existing
        }

        store.dispatch(
            requestPatchAccount(account._id, payload)
        );

        window.location = '/saved-addresses';
    };

    render() {
        const { account, match: { params } } = this.props;
        const { addressKey } = params;


        if (!account || !account.addressBook || isNil(addressKey)) {
            return null;
        }

        let currentAddress = account.addressBook[addressKey];

        if (!account.contactPreferences) {
            return <div>No Account</div>;
        }

        return (
            <Container>
                <Typography variant="h3" gutterBottom>
                    Manage Addresses
        </Typography>
                <Link variant="button" color="textPrimary">
                    <RouterLink to="/saved-addresses">Back</RouterLink>
                </Link>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper style={pStyle}>
                            <Typography variant="h3" gutterBottom>
                                Edit your address
              </Typography>
                            <Formik
                                initialValues={getInitialValues(currentAddress)}
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
)(withRouter(EditAddress));


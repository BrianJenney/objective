import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, omit } from 'lodash';
import { useSnackbar } from 'notistack';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { fonts } from '../Theme/fonts';
import { sendCreditCardRequest } from '../../utils/braintree';
import { EditablePanel, MenuLink, AlertPanel, Button } from '../common';
import { getDefaultEntity } from '../../utils/misc';
import { PaymentSummary } from '../summaries';
import { PaymentForm } from '../forms';

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

const AccountPaymentDetails = ({
  currentUser,
  requestPatchAccount,
  title,
  withSmallTitle,
  subTitle,
  onBack,
  onSubmit,
  seedEnabled,
  addressSeed,
  useSeedLabel,
  allowFlyMode,
  location,
  ...rest
}) => {
  const classes = useStyles();
  /* const isCheckoutPage = matchPath(location.pathname, { path: '/checkout' });
  will fix later, it broke the code*/
  let isCheckoutPage = false;
  if (window.location.pathname.includes('checkout')) {
    isCheckoutPage = true;
  }
  const [addModeEnabled, setAddModeEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { enqueueSnackbar } = useSnackbar();
  const creditCards = get(currentUser, 'data.paymentMethods', []);
  const account_jwt = get(currentUser, 'data.account_jwt', '');
  const addressBook = get(currentUser, 'data.addressBook', []);

  useEffect(() => {
    const paymentMethods = currentUser.data.paymentMethods || [];
    const defaultIndex = paymentMethods.findIndex(method => method.isDefault);
    setSelectedIndex(defaultIndex);
  }, [currentUser.data.paymentMethods]);

  const handleSelect = evt => {
    const index = parseInt(evt.target.value, 10);
    setSelectedIndex(index);
  };
  const deleteCreditCard = deletedCreditCardToken => {
    const payload = { deletedCreditCardToken };

    requestPatchAccount(account_jwt, payload);
  };
  const setDefaultCreditCard = defaultCreditCardToken => {
    const payload = { defaultCreditCardToken };

    requestPatchAccount(account_jwt, payload);
  };
  const handleSave = async (values, actions) => {
    const pureValues = omit(values, ['shouldSaveData']);
    const { shouldSaveData } = values;
    const { paymentDetails, billingAddress } = pureValues;

    try {
      const cardResult = await sendCreditCardRequest({
        ...paymentDetails,
        postalCode: billingAddress.postalCode
      });
      const { nonce, details } = cardResult.creditCards[0];
      const payload = {
        newCreditCard: {
          name: paymentDetails.cardholderName,
          last4: `${details.cardType} ${details.lastFour}`,
          expirationDate: `Expires ${paymentDetails.expirationDate}`,
          billingAddress
        },
        nonce
      };

      if (allowFlyMode && !shouldSaveData) {
        actions.setSubmitting(false);
        setAddModeEnabled(false);
        return onSubmit({
          ...payload.newCreditCard,
          nonce: payload.nonce
        });
      }

      if (isEmpty(creditCards)) {
        payload.newCreditCard.isDefault = true;
      }

      requestPatchAccount(account_jwt, payload);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
    actions.setSubmitting(false);
    setAddModeEnabled(false);

    return true;
  };
  const handleSubmit = () => {
    if (selectedIndex < 0) {
      return false;
    }

    const selectedCreditCard = creditCards[selectedIndex];
    onSubmit(selectedCreditCard);

    return true;
  };

  let addressSeedData = addressSeed;
  if (seedEnabled && isEmpty(addressSeed)) {
    addressSeedData = getDefaultEntity(addressBook);
  }

  return (
    <Box {...rest} className="step-3-wrapper account-payment-details">
      {isCheckoutPage ? (
        <Box color="#231f20">
          <Box
            component={Typography}
            variant="h5"
            children={title}
            fontSize={withSmallTitle ? 30 : 48}
            fontFamily="Canela Text, serif"
            mb={4}
          />
          {subTitle && (
            <Box
              component={Typography}
              variant="h5"
              children={subTitle}
              fontSize={18}
              fontWeight={600}
              fontFamily="P22Underground"
              style={{ textTransform: 'uppercase' }}
              mb={4}
            />
          )}
        </Box>
      ) : (
        <div>
          <Typography className={classes.title} variant="h1" gutterBottom>
            Payment Details
          </Typography>
          <Typography className={classes.info} variant="h3" gutterBottom>
            CREDIT CARD
          </Typography>
        </div>
      )}
      <Box mx="-8px" my="-8px">
        <Grid container>
          {creditCards.map((creditCardEntity, index) => (
            <Grid key={`credit_card_entity_${index}`} item xs={12} sm={6}>
              <Box
                display="flex"
                alignItems="flex-start"
                m={1}
                px={4}
                py={3}
                border="2px solid #979797"
              >
                <Box ml="-17px" mt="-9px">
                  <Radio
                    name="payment-method-selector"
                    style={{ color: '#231f20' }}
                    value={index.toString()}
                    onChange={handleSelect}
                    checked={selectedIndex === index}
                  />
                </Box>
                <EditablePanel
                  title=""
                  defaultValues={creditCardEntity}
                  Summary={PaymentSummary}
                  onRemove={
                    creditCardEntity.isDefault
                      ? undefined
                      : () => deleteCreditCard(creditCardEntity.token)
                  }
                  onSetDefault={
                    creditCardEntity.isDefault
                      ? undefined
                      : () => setDefaultCreditCard(creditCardEntity.token)
                  }
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt="26px" mb="55px">
        {isEmpty(creditCards) && (
          <AlertPanel mb={2} type="info" text="No Saved Credit Cards." />
        )}
        {addModeEnabled ? (
          <PaymentForm
            title=""
            seedEnabled={seedEnabled}
            addressSeed={addressSeedData}
            useSeedLabel={useSeedLabel}
            onlyCard
            onSubmit={handleSave}
            onBack={() => setAddModeEnabled(false)}
            allowFlyMode={allowFlyMode}
          />
        ) : (
          <Box
            fontSize={16}
            fontWeight={600}
            style={{ textTransform: 'uppercase' }}
          >
            <MenuLink
              onClick={() => setAddModeEnabled(true)}
              children="Add New Card"
              underline="always"
            />
          </Box>
        )}
      </Box>
      {!addModeEnabled && (
        <ButtonGroup fullWidth aria-label="full width button group">
          {onBack && (
            <Button
              color="secondary"
              type="button"
              onClick={onBack}
              children="Back"
              mr={2}
            />
          )}
          {onSubmit && (
            <Button type="button" onClick={handleSubmit} children="Next" />
          )}
        </ButtonGroup>
      )}
    </Box>
  );
};

AccountPaymentDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  title: PropTypes.string,
  withSmallTitle: PropTypes.bool,
  subTitle: PropTypes.string,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
  seedEnabled: PropTypes.bool,
  addressSeed: PropTypes.object,
  useSeedLabel: PropTypes.string,
  allowFlyMode: PropTypes.bool
};

AccountPaymentDetails.defaultProps = {
  title: 'Payment Details',
  withSmallTitle: false,
  subTitle: 'Credit Card',
  allowFlyMode: false
};

export default AccountPaymentDetails;

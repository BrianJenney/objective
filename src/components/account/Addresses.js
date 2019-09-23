import React, { useState } from 'react';
import { matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get, isEmpty, isNil, omit } from 'lodash';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { fonts } from '../../components/Theme/fonts.js';
import { EditablePanel, MenuLink, AlertPanel, Button } from '../common';
import { AddressSummary } from '../summaries';
import { AddressForm } from '../forms';

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

const AccountAddresses = ({
  currentUser,
  requestPatchAccount,
  title,
  withSmallTitle,
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
  const addressBook = get(currentUser, 'data.addressBook', []);
  const account_jwt = get(currentUser, 'data.account_jwt', '');

  const deleteAddress = deletedIndex => {
    const newAddressBook = addressBook.filter(
      (address, index) => index !== deletedIndex
    );
    const payload = { addressBook: newAddressBook };

    requestPatchAccount(account_jwt, payload);
  };

  const setDefaultAddress = targetIndex => {
    const newAddressBook = addressBook.map((addressEntity, index) => {
      if (index === targetIndex) {
        return {
          ...addressEntity,
          isDefault: true
        };
      }
      return {
        ...addressEntity,
        isDefault: false
      };
    });
    const payload = { addressBook: newAddressBook };

    requestPatchAccount(account_jwt, payload);
  };

  const handleSave = (values, actions, targetIndex) => {
    const pureValues = omit(values, ['shouldSaveData']);
    const { shouldSaveData } = values;

    if (allowFlyMode && !shouldSaveData) {
      actions.setSubmitting(false);
      setAddModeEnabled(false);
      return onSubmit(pureValues);
    }

    let newAddressBook = null;
    if (isNil(targetIndex)) {
      if (isEmpty(addressBook)) {
        pureValues.isDefault = true;
      }
      newAddressBook = [...addressBook, pureValues];
    } else {
      newAddressBook = addressBook.map((addressEntity, index) => {
        if (index === targetIndex) {
          return pureValues;
        }
        return addressEntity;
      });
    }

    const payload = { addressBook: newAddressBook };

    requestPatchAccount(account_jwt, payload);
    actions.setSubmitting(false);
    setAddModeEnabled(false);

    return true;
  };

  return (
    <Box {...rest} className="step-2-wrapper account-addresses">
      {isCheckoutPage ? (
        <Box
          component={Typography}
          color="#231f20"
          variant="h5"
          children={title}
          fontSize={withSmallTitle ? 30 : 48}
          fontFamily="Canela Text, serif"
          mb={4}
        />
      ) : (
        <Typography className={classes.title} variant="h1" gutterBottom>
          Saved Addresses
        </Typography>
      )}
      <Box mx="-8px" my="-8px">
        <Grid container>
          {addressBook.map((addressEntity, index) => (
            <Grid key={`address_entity_${index}`} item xs={12} sm={6}>
              <Box m={1} px={4} py={3} className="address-box">
                <EditablePanel
                  title=""
                  defaultValues={addressEntity}
                  onFormSubmit={(...args) => handleSave(...args, index)}
                  Form={AddressForm}
                  Summary={AddressSummary}
                  onRemove={
                    addressEntity.isDefault
                      ? undefined
                      : () => deleteAddress(index)
                  }
                  onSetDefault={
                    addressEntity.isDefault
                      ? undefined
                      : () => setDefaultAddress(index)
                  }
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box my={2}>
        {isEmpty(addressBook) && (
          <AlertPanel mb={2} type="info" text="No Saved Addresses." />
        )}
        {addModeEnabled ? (
          <AddressForm
            title=""
            seedEnabled={seedEnabled}
            addressSeed={addressSeed}
            useSeedLabel={useSeedLabel}
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
              children="Add New Address"
              underline="always"
            />
          </Box>
        )}
      </Box>
      {!addModeEnabled && (
        <ButtonGroup fullWidth className="button-holder-mobile">
          {onBack && (
            <Button type="button" onClick={onBack} children="Back" mr={2} />
          )}
          {onSubmit && (
            <Button
              type="button"
              onClick={() => onSubmit()}
              children="Continue"
            />
          )}
        </ButtonGroup>
      )}
    </Box>
  );
};

AccountAddresses.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  title: PropTypes.string,
  withSmallTitle: PropTypes.bool,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
  seedEnabled: PropTypes.bool,
  addressSeed: PropTypes.object,
  useSeedLabel: PropTypes.string,
  allowFlyMode: PropTypes.bool
};

AccountAddresses.defaultProps = {
  title: 'Saved Addresses',
  withSmallTitle: false,
  allowFlyMode: false
};

export default AccountAddresses;

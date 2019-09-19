import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, isNil, omit } from 'lodash';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { EditablePanel, MenuLink, AlertPanel, Button } from '../common';
import { AddressSummary } from '../summaries';
import { AddressForm } from '../forms';
import {fonts} from '../Theme/fonts';

const AccountAddresses = ({
  currentUser,
  requestPatchAccount,
  onBack,
  onSubmit,
  seedEnabled,
  addressSeed,
  useSeedLabel,
  allowFlyMode,
  ...rest
}) => {
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
  let isCheckout = false;
  if (window.location.pathname.includes('checkout')) {
    isCheckout = true;
  }

  return (
    <Box {...rest} className="step-2-wrapper">
      {isCheckout ? (
        <Box
          component={Typography}
          mx={1}
          color="#231f20"
          variant="h5"
          children="Shipping Address"
          fontFamily="Canela Text, serif"
          gutterBottom
        />
      ) : (
        <Box
          component={Typography}
          mx={1}
          color="#231f20"
          variant="h5"
          children="Saved Addresses"
          gutterBottom
        />
      )}
      <Grid container>
        {addressBook.map((addressEntity, index) => {
          const borderStyle = addressEntity.isDefault
            ? '2px solid #000'
            : '1px solid #979797';
          return (
            <Grid key={`address_entity_${index}`} item xs={12} sm={6}>
              <Box
                border={borderStyle}
                m={1}
                px={4}
                py={3}
                className="address-box"
              >
                <EditablePanel
                  title=""
                  defaultValues={addressEntity}
                  onSubmit={(...args) => handleSave(...args, index)}
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
          );
        })}
      </Grid>
      <Box mx={1} my={2}>
        {isEmpty(addressBook) && (
          <AlertPanel type="info" text="No Saved Addresses." />
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
            fontWeight="bold"
            fontFamily={fonts.smallHeader}
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
        <Box
          display="flex"
          alignItems="center"
          className="button-holder-mobile"
        >
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
        </Box>
      )}
    </Box>
  );
};

AccountAddresses.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
  seedEnabled: PropTypes.bool,
  addressSeed: PropTypes.object,
  useSeedLabel: PropTypes.string,
  allowFlyMode: PropTypes.bool
};

AccountAddresses.defaultProps = {
  allowFlyMode: false
};

export default AccountAddresses;

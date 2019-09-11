import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, isNil } from 'lodash';
import { Box, Grid, Typography } from '@material-ui/core';
import { EditablePanel, MenuLink, AlertPanel, Button } from '../common';
import { AddressSummary } from '../summaries';
import { AddressForm } from '../forms';

const AccountAddresses = ({
  currentUser,
  requestPatchAccount,
  onBack,
  onSubmit,
  allowFlyMode,
  seedEnabled,
  addressSeed,
  useSeedLabel
}) => {
  const [addModeEnabled, setAddModeEnabled] = useState(false);
  const [flyModeEnabled, setFlyModeEnabled] = useState(false);
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
    [newAddressBook[0], newAddressBook[targetIndex]] = [
      newAddressBook[targetIndex],
      newAddressBook[0]
    ];
    const payload = { addressBook: newAddressBook };

    requestPatchAccount(account_jwt, payload);
  };

  const saveAddress = (values, actions, targetIndex) => {
    let newAddressBook = null;
    if (isNil(targetIndex)) {
      newAddressBook = [...addressBook, values];
    } else {
      newAddressBook = addressBook.map((addressEntity, index) => {
        if (index === targetIndex) {
          return values;
        }
        return addressEntity;
      });
    }

    const payload = { addressBook: newAddressBook };

    requestPatchAccount(account_jwt, payload);
    actions.setSubmitting(false);
    setAddModeEnabled(false);
    setFlyModeEnabled(false);
  };

  return (
    <Box>
      <Box
        component={Typography}
        mx={1}
        variant="h5"
        children="Saved Addresses"
        gutterBottom
      />
      <Grid container>
        {addressBook.map((addressEntity, index) => {
          const borderStyle = addressEntity.isDefault
            ? '2px solid #000'
            : '1px solid #979797';
          return (
            <Grid key={`address_entity_${index}`} item xs={12} sm={6}>
              <Box border={borderStyle} m={1} p={2}>
                <EditablePanel
                  title=""
                  defaultValues={addressEntity}
                  onSubmit={(...args) => saveAddress(...args, index)}
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
        {addModeEnabled || flyModeEnabled ? (
          <AddressForm
            title=""
            onSubmit={addModeEnabled ? saveAddress : onSubmit}
            onBack={() => {
              setAddModeEnabled(false);
              setFlyModeEnabled(false);
            }}
            seedEnabled={flyModeEnabled ? seedEnabled : undefined}
            addressSeed={flyModeEnabled ? addressSeed : undefined}
            useSeedLabel={flyModeEnabled ? useSeedLabel : undefined}
            submitLabel={addModeEnabled ? 'Save' : 'Next'}
            backLabel={addModeEnabled ? 'Cancel' : 'Back'}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            fontSize={16}
            fontWeight="bold"
            style={{ textTransform: 'uppercase' }}
          >
            <Box>
              <MenuLink
                onClick={() => {
                  setAddModeEnabled(true);
                  setFlyModeEnabled(false);
                }}
                children="Add New Address"
                underline="always"
              />
            </Box>
            {allowFlyMode && (
              <Box ml={2}>
                <MenuLink
                  onClick={() => {
                    setAddModeEnabled(false);
                    setFlyModeEnabled(true);
                  }}
                  children="Use One-time Address"
                  underline="always"
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
      {!addModeEnabled && !flyModeEnabled && (
        <Box display="flex" alignItems="center">
          {onBack && (
            <Button type="button" onClick={onBack} children="Back" mr={2} />
          )}
          {onSubmit && (
            <Button type="button" onClick={() => onSubmit()} children="Next" />
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
  allowFlyMode: PropTypes.bool,
  seedEnabled: PropTypes.bool,
  addressSeed: PropTypes.object,
  useSeedLabel: PropTypes.string
};

AccountAddresses.defaultProps = {
  allowFlyMode: false
};

export default AccountAddresses;

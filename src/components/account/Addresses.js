import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, isNil } from 'lodash';
import { Box, Grid, Typography } from '@material-ui/core';
import { EditablePanel, MenuLink, AlertPanel } from '../common';
import { AddressSummary } from '../summaries';
import { AddressForm } from '../forms';

const AccountAddresses = ({ currentUser, requestPatchAccount }) => {
  const [addModeEnabled, setAddModeEnabled] = useState(false);
  const addressBook = get(currentUser, 'addressBook', []);
  const deleteAddress = deletedIndex => {
    const newAddressBook = addressBook.filter(
      (address, index) => index !== deletedIndex
    );
    const payload = { addressBook: newAddressBook };

    requestPatchAccount(currentUser.account_jwt, payload);
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

    requestPatchAccount(currentUser.account_jwt, payload);
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

    requestPatchAccount(currentUser.account_jwt, payload);
    actions.setSubmitting(false);
    setAddModeEnabled(false);
  };

  return (
    <Box>
      <Typography variant="h5" children="Saved Addresses" gutterBottom />
      <Grid container>
        {addressBook.map((addressEntity, index) => (
          <Grid key={`address_entity_${index}`} item xs={12} sm={6}>
            <Box border="1px solid #979797" m={1} p={4}>
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
        ))}
      </Grid>
      <Box mt={2}>
        {isEmpty(addressBook) && (
          <AlertPanel type="info" text="No Addresses. Please add." />
        )}
        {addModeEnabled ? (
          <AddressForm
            title=""
            onSubmit={saveAddress}
            onBack={() => setAddModeEnabled(false)}
          />
        ) : (
          <MenuLink
            onClick={() => setAddModeEnabled(true)}
            children="Add New Address"
          />
        )}
      </Box>
    </Box>
  );
};

AccountAddresses.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired
};

export default AccountAddresses;

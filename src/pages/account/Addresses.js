import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty, isNil } from 'lodash';
import { Box, Grid, Typography } from '@material-ui/core';
import { EditablePanel, MenuLink, AlertPanel } from '../../components/common';
import { AddressSummary } from '../../components/summaries';
import { AddressForm } from '../../components/forms';
import { requestPatchAccount as requestPatchAccountAction } from '../../modules/account/actions';

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

  const saveAddress = (values, targetIndex) => {
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
  };

  if (isEmpty(addressBook)) {
    return <AlertPanel type="info" text="No Addresses. Please add." />;
  }

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
                onSubmit={values => saveAddress(values, index)}
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
        {addModeEnabled ? (
          <AddressForm
            title=""
            onSubmit={values => saveAddress(values)}
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

const mapDispatchToProps = {
  requestPatchAccount: requestPatchAccountAction
};

export default connect(
  null,
  mapDispatchToProps
)(AccountAddresses);

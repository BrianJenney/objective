import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, omit } from 'lodash';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import { EditablePanel, MenuLink, AlertPanel, Button } from '../common';
import { AddressSummary } from '../summaries';
import { AddressForm } from '../forms';
import { FORM_TYPES } from '../forms/AddressForm';

const AccountAddresses = ({
  currentUser,
  requestPatchAccount,
  clearPatchAccountError,
  formType,
  onSubmit,
  selectionEnabled,
  seedEnabled,
  addressSeed,
  useSeedLabel,
  allowFlyMode,
  ...rest
}) => {
  const [formModeEnabled, setFormModeEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [editedIndex, setEditedIndex] = useState(-1);
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const addressBook = get(currentUser, 'data.addressBook', []);
  const account_jwt = get(currentUser, 'data.account_jwt', '');
  const titleFontSize = formType === FORM_TYPES.ACCOUNT ? 48 : xs ? 24 : 30; // eslint-disable-line

  useEffect(() => {
    const addressesData = currentUser.data.addressBook || [];
    const defaultIndex = addressesData.findIndex(address => address.isDefault);
    setSelectedIndex(defaultIndex);
  }, [currentUser.data.addressBook]);

  const handleSelect = evt => {
    const index = parseInt(evt.target.value, 10);
    setSelectedIndex(index);
  };

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

  const handleSave = (values, actions) => {
    const pureValues = omit(values, ['shouldSaveData']);
    const { shouldSaveData } = values;

    if (allowFlyMode && !shouldSaveData) {
      actions.setSubmitting(false);
      setFormModeEnabled(false);
      setEditedIndex(-1);

      return onSubmit(pureValues);
    }

    let newAddressBook = null;
    if (editedIndex < 0) {
      if (isEmpty(addressBook)) {
        pureValues.isDefault = true;
      }
      newAddressBook = [...addressBook, pureValues];
    } else {
      newAddressBook = addressBook.map((addressEntity, index) => {
        if (index === editedIndex) {
          return pureValues;
        }
        return addressEntity;
      });
    }

    const payload = { addressBook: newAddressBook };

    requestPatchAccount(account_jwt, payload);
    actions.setSubmitting(false);

    return true;
  };

  const handleSubmit = () => {
    if (selectedIndex < 0) {
      return false;
    }

    const selectedAddress = addressBook[selectedIndex];
    onSubmit(selectedAddress);

    return true;
  };
  return (
    <Box {...rest} className="step-2-wrapper account-addresses">
      
      {window.location.pathname.indexOf("/account/addresses")!==-1 ? (window.analytics.page("Account Addresses") && (null)) : null}
      {formModeEnabled ? (
        <AddressForm
          currentUser={currentUser}
          formType={formType}
          seedEnabled={seedEnabled}
          addressSeed={addressSeed}
          useSeedLabel={useSeedLabel}
          defaultValues={editedIndex > -1 ? addressBook[editedIndex] : null}
          onSubmit={handleSave}
          clearPatchAccountError={clearPatchAccountError}
          onBack={() => {
            setFormModeEnabled(false);
            setEditedIndex(-1);
          }}
          allowFlyMode={allowFlyMode}
        />
      ) : (
        <>
          {(!xs || formType !== FORM_TYPES.ACCOUNT) && (
            <Box
              component={Typography}
              color="#231f20"
              variant="h5"
              children={
                formType === FORM_TYPES.ACCOUNT
                  ? 'Saved Addresses'
                  : 'Shipping Address'
              }
              fontSize={titleFontSize}
              mb={formType === FORM_TYPES.ACCOUNT ? 4 : 3}
            />
          )}
          {isEmpty(addressBook) && (
            <AlertPanel mb={2} type="info" text="No Saved Addresses." />
          )}
          <Box mx="-8px" my="-8px">
            <Grid container>
              {addressBook.map((addressEntity, index) => (
                <Grid key={`address_entity_${index}`} item xs={12} sm={6}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    m={1}
                    px={4}
                    py={3}
                    border="2px solid #979797"
                  >
                    {selectionEnabled && (
                      <Box ml="-17px" mt="-9px">
                        <Radio
                          name="address-selector"
                          style={{ color: '#231f20' }}
                          value={index.toString()}
                          onChange={handleSelect}
                          checked={selectedIndex === index}
                        />
                      </Box>
                    )}
                    <Box
                      maxWidth={
                        selectionEnabled ? 'calc(100% - 28.5px)' : '100%'
                      }
                    >
                      <EditablePanel
                        title=""
                        defaultValues={addressEntity}
                        Summary={AddressSummary}
                        onEdit={() => {
                          setFormModeEnabled(true);
                          setEditedIndex(index);
                        }}
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
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            mt="26px"
            fontSize={xs ? 14 : 16}
            fontWeight={600}
            style={{ textTransform: 'uppercase' }}
          >
            <MenuLink
              onClick={() => setFormModeEnabled(true)}
              children="Add New Address"
              underline="always"
            />
          </Box>
          {onSubmit && (
            <Box mt={xs ? '28px' : '55px'} width={xs ? 1 : '438px'} mx="auto">
              <Button
                fullWidth
                type="button"
                onClick={handleSubmit}
                children="Continue"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

AccountAddresses.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  clearPatchAccountError: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(Object.values(FORM_TYPES)),
  onSubmit: PropTypes.func,
  selectionEnabled: PropTypes.bool,
  seedEnabled: PropTypes.bool,
  addressSeed: PropTypes.object,
  useSeedLabel: PropTypes.string,
  allowFlyMode: PropTypes.bool
};

AccountAddresses.defaultProps = {
  formType: FORM_TYPES.ACCOUNT,
  allowFlyMode: false
};

export default AccountAddresses;

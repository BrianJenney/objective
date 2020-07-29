import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, omit } from 'lodash';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import AddIcon from '@material-ui/icons/Add';
import { EditablePanel, MenuLink, AlertPanel, Button } from '../common';
import { AddressSummary } from '../summaries';
import { AddressForm } from '../forms';
import { FORM_TYPES } from '../forms/AddressForm';
import VariantRestrictions from '../../utils/product/variant.restriction.class';
import { removeFromCart } from '../../modules/cart/functions';
import { scrollToRef } from '../../utils/misc';
import { requestCheckEmailExistence } from '../../modules/account/actions';
import { useDispatch } from 'react-redux';
const AccountAddresses = ({
  currentUser,
  cart,
  requestPatchAccount,
  restrictionValidations,
  setRestrictionMessage,
  setRestrictedProduct,
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
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [editedIndex, setEditedIndex] = useState(-1);
  const dispatch = useDispatch();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const addressBook = get(currentUser, 'data.addressBook', []);
  const account_jwt = get(currentUser, 'data.account_jwt', '');
  const titleFontSize = formType === FORM_TYPES.ACCOUNT ? 36 : xs ? 24 : 30; // eslint-disable-line

  useEffect(() => {
    if (rest.resetFormMode && addressBook.length === 0 && !account_jwt) {
      setFormModeEnabled(true);
      setIsEditing(true);
    }
  }, [rest]);
  useEffect(() => {
    const addressesData = currentUser.data.addressBook || [];
    if (addressesData.length === 0) {
      setFormModeEnabled(true);
    } else {
      setFormModeEnabled(false);
    }

    setSelectedIndex(addressesData.findIndex(address => address.isDefault));
  }, [currentUser.data.addressBook]);

  useEffect(() => {
    if (window.location.pathname.indexOf('/account/addresses') !== -1) {
      window.analytics.page('Account Addresses');
    }
  }, []);

  const handleSelect = evt => {
    const index = parseInt(evt.target.value, 10);
    setSelectedIndex(index);
  };

  const deleteAddress = deletedIndex => {
    const newAddressBook = addressBook.filter((address, index) => index !== deletedIndex);
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
    let currentIndex = editedIndex;
    // Validate new address against cart_items at Checkout only
    if (formType === 'checkout') {
      const restrictions = new VariantRestrictions(cart.items);
      const restrictionValidations = restrictions.validate(values, 'variant_id', 'variant_name');
      if (restrictionValidations.hasRestrictions) {
        restrictionValidations.items.map(item => {
          setRestrictionMessage(true);
          setRestrictedProduct(item.item_name);
          removeFromCart(cart, item.key);
        });
      }

      if (!account_jwt) {
        //Request backend check of email existence
        if (Object.prototype.hasOwnProperty.call(values, 'email')) {
          dispatch(requestCheckEmailExistence(values.email));
        }
        actions.setSubmitting(false);
        setIsEditing(false);
        setFormModeEnabled(false);
        setEditedIndex(-1);
        return onSubmit(pureValues);
      }
    }

    if (allowFlyMode && !shouldSaveData) {
      actions.setSubmitting(false);
      setIsEditing(false);
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
      currentIndex = newAddressBook.length - 1;
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
    setIsEditing(false);
    actions.setSubmitting(false);
    setFormModeEnabled(false);
    setSelectedIndex(currentIndex);
    setEditedIndex(-1);

    if (onSubmit) {
      onSubmit(pureValues);
    }
    return true;
  };

  const handleSubmit = () => {
    if (selectedIndex < 0) {
      return false;
    }

    const selectedAddress = addressBook[selectedIndex];
    const restrictions = new VariantRestrictions(cart.items);
    const restrictionValidations = restrictions.validate(
      selectedAddress,
      'variant_id',
      'variant_name'
    );
    if (restrictionValidations.hasRestrictions) {
      restrictionValidations.items.map(item => {
        setRestrictionMessage(true);
        setRestrictedProduct(item.item_name);
        removeFromCart(cart, item.key);
      });
    }
    onSubmit(selectedAddress);

    return true;
  };

  return (
    <Box {...rest} className="step-2-wrapper account-addresses">
      {formModeEnabled ? (
        <>
          {!xs && formType === FORM_TYPES.ACCOUNT ? (
            <Typography
              variant="h5"
              children="Saved Addresses"
              style={{ color: theme.palette.brand.accentBrown }}
            />
          ) : null}
          <AddressForm
            currentUser={currentUser}
            formType={formType}
            isEditing={isEditing}
            seedEnabled={seedEnabled}
            addressSeed={addressSeed}
            useSeedLabel={useSeedLabel}
            defaultValues={
              editedIndex > -1 && addressBook[editedIndex]
                ? addressBook[editedIndex]
                : rest.shippingAddressActive
                ? rest.shippingAddressActive
                : null
            }
            onSubmit={handleSave}
            clearPatchAccountError={clearPatchAccountError}
            onBack={() => {
              setFormModeEnabled(false);
              setEditedIndex(-1);
            }}
            allowFlyMode={allowFlyMode}
            checkoutVersion={rest.checkoutVersion ? rest.checkoutVersion : 1}
            switchToLogin={rest.switchToLogin ? rest.switchToLogin : false}
          />
        </>
      ) : (
        <>
          {(!xs || formType !== FORM_TYPES.ACCOUNT) && (
            <Box
              component={Typography}
              color={theme.palette.brand.camoGreen}
              variant="h5"
              children={formType === FORM_TYPES.ACCOUNT ? 'Saved Addresses' : 'Shipping Address'}
              fontSize="25px"
              mb={formType === FORM_TYPES.ACCOUNT ? 4 : 3}
            />
          )}
          {isEmpty(addressBook) && <AlertPanel mb={2} type="info" text="No Saved Addresses." />}
          <Box mx="-8px" my="-8px">
            <Grid container>
              {addressBook.map((addressEntity, index) =>
                addressEntity.isDefault ? (
                  <Grid key={`address_entity_${index}`} item xs={12} sm={6}>
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      m={1}
                      px={4}
                      py={3}
                      className="ListBox"
                    >
                      {selectionEnabled && (
                        <Box ml="-17px" mt="-9px">
                          <Radio
                            name="address-selector"
                            value={index.toString()}
                            onChange={handleSelect}
                            checked={selectedIndex === index}
                          />
                        </Box>
                      )}
                      <Box maxWidth={selectionEnabled ? 'calc(100% - 28.5px)' : '100%'}>
                        <EditablePanel
                          title=""
                          defaultValues={addressEntity}
                          Summary={AddressSummary}
                          onEdit={() => {
                            setIsEditing(true);
                            setFormModeEnabled(true);
                            setEditedIndex(index);
                          }}
                          onRemove={
                            addressEntity.isDefault ? undefined : () => deleteAddress(index)
                          }
                          onSetDefault={
                            addressEntity.isDefault ? undefined : () => setDefaultAddress(index)
                          }
                        />
                      </Box>
                    </Box>
                  </Grid>
                ) : null
              )}
              {addressBook.map((addressEntity, index) =>
                addressEntity.isDefault === false ? (
                  <Grid key={`address_entity_${index}`} item xs={12} sm={6}>
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      m={1}
                      px={4}
                      py={3}
                      border="2px solid #a06958"
                    >
                      {selectionEnabled && (
                        <Box ml="-17px" mt="-9px">
                          <Radio
                            name="address-selector"
                            style={{ color: theme.palette.brand.accentBrown }}
                            value={index.toString()}
                            onChange={handleSelect}
                            checked={selectedIndex === index}
                          />
                        </Box>
                      )}
                      <Box maxWidth={selectionEnabled ? 'calc(100% - 28.5px)' : '100%'}>
                        <EditablePanel
                          title=""
                          defaultValues={addressEntity}
                          Summary={AddressSummary}
                          onEdit={() => {
                            setIsEditing(true);
                            setFormModeEnabled(true);
                            setEditedIndex(index);
                          }}
                          onRemove={
                            addressEntity.isDefault ? undefined : () => deleteAddress(index)
                          }
                          onSetDefault={
                            addressEntity.isDefault ? undefined : () => setDefaultAddress(index)
                          }
                        />
                      </Box>
                    </Box>
                  </Grid>
                ) : null
              )}
              <Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={xs ? 14 : 16}
                  fontWeight={600}
                  m={1}
                  px={1}
                  py={9}
                  border="1px solid #a06958"
                >
                  <div
                    style={{ textAlign: 'center' }}
                    onClick={() => {
                      const addressesData = currentUser.data.addressBook || [];
                      setFormModeEnabled(true);
                    }}
                  >
                    <AddIcon
                      style={{
                        fontSize: '50px',
                        color: theme.palette.brand.accentBrown,
                        cursor: 'pointer'
                      }}
                    />
                    <MenuLink
                      style={{
                        display: 'block',
                        color: theme.palette.brand.accentBrown,
                        fontWeight: 400
                      }}
                      children="Add New Address"
                      underline="always"
                    />
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {onSubmit && (
            <Box mt={xs ? '18px' : '45px'} width={xs ? 1 : '438px'} mx="auto">
              <Button
                fullWidth
                type="button"
                onClick={handleSubmit}
                children="Continue"
                style={{ height: '55px', padding: '0px' }}
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

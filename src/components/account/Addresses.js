import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, isNil, omit } from 'lodash';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import { fonts } from '../Theme/fonts';
import { EditablePanel, MenuLink, AlertPanel, Button } from '../common';
import { AddressSummary } from '../summaries';
import { AddressForm } from '../forms';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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
  onSubmit,
  selectionEnabled,
  seedEnabled,
  addressSeed,
  useSeedLabel,
  allowFlyMode,
  location,
  ...rest
}) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  /* const isCheckoutPage = matchPath(location.pathname, { path: '/checkout' });
  will fix later, it broke the code*/
  let isCheckoutPage = false;
  if (window.location.pathname.includes('checkout')) {
    isCheckoutPage = true;
  }
  const [addModeEnabled, setAddModeEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const addressBook = get(currentUser, 'data.addressBook', []);
  const account_jwt = get(currentUser, 'data.account_jwt', '');

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
      ) :  xs ? '' : (
        <Typography className={classes.title} variant="h1" gutterBottom>
          Saved Addresses
        </Typography>
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
      <Box mt="26px" mb="55px">
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
      {!addModeEnabled && onSubmit && (
        <Box width="438px" mx="auto">
          <Button
            fullWidth
            type="button"
            onClick={handleSubmit}
            children="Continue"
          />
        </Box>
      )}
    </Box>
  );
};

AccountAddresses.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  title: PropTypes.string,
  withSmallTitle: PropTypes.bool,
  onSubmit: PropTypes.func,
  selectionEnabled: PropTypes.bool,
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

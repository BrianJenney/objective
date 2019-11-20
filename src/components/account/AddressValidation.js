import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withDialog from '../../hoc/withDialog';
import { MenuLink, Button } from '../common';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 55px 55px'
  },
  title: {
    fontSize: 30,
    fontFamily: 'Canela Text Web',
    marginBottom: '10px'
  },
  text: {
    fontSize: 20,
    lineHeight: '1.2'
  },
  atitle: {
    fontSize: 20,
    fontFamily: 'freight-text-pro, sans-serif',
    lineHeight: '1.4',
    marginBottom: '18px'
  },
  boxHolder: {
    padding: '40px 0'
  },
  boxPadding: {
    padding: '20px 25px'
  },
  continue: {
    textAlign: 'center',
    fontWeight: 600,
    lineHeight: '1.75',
    paddingTop: '16px'
  }
}));

const AddressValidation = ({
  origAddress,
  suggAddress,
  actions,
  onSubmit,
  closeDialog
}) => {
  const [suggestedAddress, setSuggestedAddress] = useState(false);
  const [originalAddress, setOriginalAddress] = useState(false);
  const [payload, setPayload] = useState(null);
  let sAddress = null;

  useEffect(() => {
    if (suggestedAddress) {
      setPayload(sAddress);
    }
  }, [suggestedAddress]);

  useEffect(() => {
    if (originalAddress) {
      setPayload(origAddress);
    }
  }, [originalAddress]);

  useEffect(() => {
    let pload = {};
    if (originalAddress) {
      pload = {
        ...payload,
        phone: payload.phone ? payload.phone.trim() : ''
      };
      onSubmit(pload, actions);
    } else if (suggestedAddress) {
      pload = {
        ...payload,
        country: origAddress.country,
        firstName: origAddress.firstName,
        isDefault: origAddress.isDefault,
        lastName: origAddress.lastName,
        phone: origAddress.phone ? origAddress.phone.trim() : '',
        shouldSaveData: origAddress.shouldSaveData
      };
      onSubmit(pload, actions);
    }
  }, [payload]);

  if (origAddress && suggAddress && suggAddress !== false) {
    sAddress = suggAddress;
  }

  const classes = useStyles();

  return (
    <>
      {sAddress ? (
        <div className={classes.root}>
          <Box>
            <Paper className={classes.paper}>
              <Typography className={classes.title}>
                Shipping Address Validation
              </Typography>
              <Typography className={classes.text}>
                Important: we were not able to validate your shipping address.
              </Typography>
            </Paper>
          </Box>
          <Grid container spacing={2} className={classes.boxHolder}>
            <Grid item xs={12} md={6}>
              <Box
                border={1}
                borderColor="#979797"
                className={classes.boxPadding}
              >
                <Paper className={classes.paper}>
                  <div className={classes.atitle}>You entered:</div>
                  <div className={classes.text}>
                    {`${origAddress.address1} ${origAddress.address2}`}
                  </div>
                  <div className={classes.text}>
                    {`${origAddress.city} ${origAddress.state}, ${origAddress.zipcode}`}
                  </div>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                border={1}
                borderColor="#979797"
                className={classes.boxPadding}
              >
                <Paper className={classes.paper}>
                  <div className={classes.atitle}>We suggest:</div>
                  <div className={classes.text}>
                    {sAddress.address1}{' '}
                    {sAddress.address2 ? sAddress.address2 : ''}
                  </div>
                  <div className={classes.text}>
                    {`${sAddress.city} ${sAddress.state}, ${sAddress.zipcode}`}
                  </div>
                </Paper>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Paper className={classes.paper}>
              <Button
                onClick={() => {
                  setSuggestedAddress(true);
                }}
                children="USE SUGGESTED ADDRESS"
                underline="always"
                fullWidth
              />
            </Paper>
          </Box>
          <Box className={classes.continue}>
            <Paper className={classes.paper}>
              <MenuLink
                onClick={() => {
                  setOriginalAddress(true);
                }}
                children="CONTINUE WITH ORIGINAL ADDRESS"
                underline="always"
              />
            </Paper>
          </Box>
        </div>
      ) : (
          <div className={classes.root}>
            <Box>
              <Paper className={classes.paper}>
                <Typography className={classes.title}>
                  Shipping Address Validation
              </Typography>
                <Typography className={classes.text}>
                  Important: we were not able to validate your shipping address.
              </Typography>
                <Typography className={classes.text}>
                  Please confirm that the address you entered is correct.
              </Typography>
              </Paper>
            </Box>
            <Grid container spacing={2} className={classes.boxHolder}>
              <Grid item xs={12} md={6}>
                <Box
                  border={1}
                  borderColor="#979797"
                  className={classes.boxPadding}
                >
                  <Paper className={classes.paper}>
                    <div className={classes.atitle}>You entered:</div>
                    <div className={classes.text}>
                      {`${origAddress.address1} ${origAddress.address2}`}
                    </div>
                    <div className={classes.text}>
                      {`${origAddress.city} ${origAddress.state}, ${origAddress.zipcode}`}
                    </div>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
            <Box>
              <Paper className={classes.paper}>
                <Button
                  onClick={() => {
                    setOriginalAddress(true);
                  }}
                  children="YES, THIS ADDRESS IS CORRECT"
                  underline="always"
                  fullWidth
                />
              </Paper>
            </Box>
            <Box className={classes.continue}>
              <Paper className={classes.paper}>
                <MenuLink
                  onClick={() => {
                    actions.setSubmitting(false);
                    closeDialog();
                  }}
                  children="EDIT ADDRESS"
                  underline="always"
                />
              </Paper>
            </Box>
          </div>
        )}
    </>
  );
};

export default withDialog(AddressValidation);

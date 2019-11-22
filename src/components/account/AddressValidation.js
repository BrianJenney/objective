import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Paper, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import withDialog from '../../hoc/withDialog';
import { MenuLink, Button } from '../common';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 55px 55px',
    width: '730px',
    maxWidth: '800px'
  },
  rootXs: {
    padding: '10px 55px 55px'
  },
  title: {
    fontSize: 30,
    fontFamily: 'Canela Text Web',
    marginBottom: '10px'
  },
  titleXs: {
    fontSize: 30,
    fontFamily: 'Canela Text Web',
    marginBottom: '10px',
    textAlign: 'center'
  },
  text: {
    fontSize: 20,
    lineHeight: '1.2'
  },
  atitle: {
    fontSize: 20,
    fontFamily: 'freight-text-pro, sans-serif',
    lineHeight: '1.4',
    marginBottom: '18px',
    fontWeight: 600,
  },
  boxHolder: {
    padding: '40px 0'
  },
  boxPadding: {
    padding: '20px 25px'
  },
  grid: {
    maxWidth: '49.33%'
  },
  gridNoSug: {
    maxWidth: '60.33%',
    flexBasis: '60.33%'
  },
  continue: {
    textAlign: 'center',
    fontWeight: 600,
    lineHeight: '1.75',
    paddingTop: '16px'
  },
  button: {
    width: '99% !important'
  }
}));

const AddressValidation = ({
  origAddress,
  suggAddress,
  actions,
  onSubmit,
  closeDialog
}) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
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
        <div className={xs ? classes.rootXs : classes.root}>
          <Box>
            <Paper className={classes.paper}>
              <Typography className={xs ? classes.titleXs : classes.title}>
                Shipping Address Validation
              </Typography>
              <Typography className={classes.text}>
                Important: we were not able to validate your shipping address.
              </Typography>
            </Paper>
          </Box>
          <Grid container spacing={2} className={classes.boxHolder}>
            <Grid item xs={12} md={6} className={xs ? '' : classes.grid}>
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
                    {`${origAddress.city} ${origAddress.state}`}
                  </div>
                  <div className={classes.text}>{`${origAddress.zipcode}`}</div>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className={xs ? '' : classes.grid}>
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
                    {`${sAddress.city} ${sAddress.state}`}
                  </div>
                  <div className={classes.text}>{`${sAddress.zipcode}`}</div>
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
                className={xs ? '' : classes.button}
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
          <div className={classes.rootXs}>
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
              <Grid item xs={12} md={6} className={xs ? '' : classes.gridNoSug}>
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
                      {`${origAddress.city} ${origAddress.state}`}
                    </div>
                    <div className={classes.text}>{`${origAddress.zipcode}`}</div>
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
                  className={xs ? '' : classes.button}
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
        )
      }
    </>
  );
};

export default withDialog(AddressValidation);

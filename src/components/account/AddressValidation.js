import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Container,
  CssBaseline,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withDialog from '../../hoc/withDialog';
import { MenuLink, Button } from '../common';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 450,
    width: 635
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left'
  },
  title: {
    fontSize: 30
  },
  text: {
    fontSize: 20
  },
  atitle: {
    fontSize: 18
  }
}));

const AddressValidation = ({ origAddress, suggAddress, actions, onSubmit }) => {
  const [suggestedAddress, setSuggestedAddress] = useState(false);
  const [originalAddress, setOriginalAddress] = useState(false);
  const [payload, setPayload] = useState(null);

  let sAddress = null;
  if (origAddress && suggAddress) {
    sAddress = suggAddress;
  }

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

  const classes = useStyles();

  return (
    <>
      {sAddress ? (
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <Box px={6}>
                <Paper className={classes.paper}>
                  <Typography className={classes.title}>
                    Shipping Address Validation
                  </Typography>
                  <Typography className={classes.text}>
                    Important: we were not able to validate your shipping
                    address
                  </Typography>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box pl={6} py={3} mr={1.5}>
                <Box border={1} borderColor="#979797">
                  <Paper className={classes.paper}>
                    <Typography className={classes.atitle}>
                      You entered:
                    </Typography>
                    <Box fontWeight={500}>
                      <Typography className={classes.text}>
                        {`${origAddress.address1} ${origAddress.address2}`}
                      </Typography>
                      <Typography className={classes.text}>
                        {`${origAddress.city} ${origAddress.state}, ${origAddress.zipcode}`}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box pr={6} py={3}>
                <Box border={1} borderColor="#979797">
                  <Paper className={classes.paper}>
                    <Typography className={classes.atitle}>
                      We suggest:
                    </Typography>
                    <Box fontWeight={500}>
                      <Typography className={classes.text}>
                        {sAddress.address1}{' '}
                        {sAddress.address2 ? sAddress.address2 : ''}
                      </Typography>
                      <Typography className={classes.text}>
                        {`${sAddress.city} ${sAddress.state}, ${sAddress.zipcode}`}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box px={5}>
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
            </Grid>
            <Grid item xs={12}>
              <Box px={20} pt={2}>
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
            </Grid>
          </Grid>
        </div>
      ) : null}
    </>
  );
};

export default withDialog(AddressValidation);

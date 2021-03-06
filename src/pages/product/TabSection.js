import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import './cards-styles.css';

import HowItWorksTab from './HowItWorksTab';
import SupplementFactsTab from './SupplementFactsTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={2}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  indicator: {
    backgroundColor: '#fff'
  },
  tabs: {
    borderLeft: '2px solid #003833',
    borderBottom: '2px solid #003833',
    backgroundColor: '#fdfbf9',
    padding: '30px 0',
    fontFamily: 'p22-underground, Helvetica, sans',
    fontSize: '24px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#000000'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px'
    }
  },
  wrapper: {
    marginTop: '50px',
    border: '2px solid #003833',
    backgroundColor: '#FFF'
  }
}));

export default function PdpTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Container>
      <Grid spacing={0} xs={12}>
        <Box className={classes.wrapper}>
          <div className={classes.root}>
            <AppBar position="static" color="white" elevation={0}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                textColor="primary"
                classes={{ indicator: classes.indicator }}
              >
                <Tab
                  variant="smallHeader"
                  label="How it works"
                  {...a11yProps(0)}
                  className={classes.tabs}
                  style={{ borderLeft: 'none' }}
                />
                <Tab
                  variant="smallHeader"
                  label="Supplement Facts"
                  {...a11yProps(1)}
                  className={classes.tabs}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <HowItWorksTab />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <SupplementFactsTab />
            </TabPanel>
          </div>
        </Box>
      </Grid>
    </Container>
  );
}

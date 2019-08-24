import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ProductContext from '../../contexts/ProductContext';
import './cards-styles.css'

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
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  indicator: {
    display: 'block',
    borderBottom: '1px solid #ffffff',
    backgroundColor: '#fdf8f2',
  },
  tabs: {
    borderLeft: '1px solid #003833',
    borderBottom: '1px solid #003833',
    backgroundColor: '#fdf8f2',
    padding: '30px 0',
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'bold',
    "&:hover" : {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
  },
  wrapper: {
    marginTop: '50px',
    border: '1px solid #003833'
  },
}));

export default function PdpTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { hiwTab, infoTab } = useContext(ProductContext);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  if (!hiwTab || !infoTab) {
    return null;
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
                <Tab variant="smallHeader" label="How it works" {...a11yProps(0)} className={classes.tabs} style={{borderLeft: 'none'}} />
                <Tab variant="smallHeader" label="Information" {...a11yProps(1)} className={classes.tabs} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div dangerouslySetInnerHTML={{ __html: hiwTab }} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div dangerouslySetInnerHTML={{ __html: infoTab }} />
            </TabPanel>
          </div>
        </Box>
      </Grid>
    </Container>
  );
}

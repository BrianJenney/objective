import React, { useContext } from 'react';
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
  root: {
    backgroundColor: 'white'
  },
  indicator: {
    display: 'none'
  },
  tabs: {
    borderBottom: '1px solid #003833',
    borderLeft: '1px solid #003833',
    backgroundColor: '#FDF8F2'
  },
  wrapper: {
    marginTop: '50px',
    border: '1px solid #003833'
  }
}));

export default function PdpTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
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
                classes={{ indicator: classes.indicator }}
              >
                <Tab label="How it works" {...a11yProps(0)} className={classes.tabs} />
                <Tab label="Information" {...a11yProps(1)} className={classes.tabs} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction} tab={0}>
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

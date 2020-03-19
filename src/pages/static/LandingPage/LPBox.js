import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import BoxTitle from './BoxTitle.js';
import List from '../List.js';

const useStyles = makeStyles(theme => ({
  border: props => ({
    border: '1px solid',
    backgroundColor: props.desktopStyle.backgroundColor,
    borderColor: props.desktopStyle.borderColor,
    display: props.desktopStyle.display,
    width: props.desktopStyle.width,
    float: props.desktopStyle.float,
    [theme.breakpoints.down('sm')]: {
      width: props.mobileStyle.width
    }
  }),
  noBorder: props => ({
    backgroundColor: props.desktopStyle.backgroundColor,
    borderColor: props.desktopStyle.borderColor,
    display: props.desktopStyle.display,
    width: props.desktopStyle.width,
    [theme.breakpoints.down('sm')]: {
      width: props.mobileStyle.width
    }
  })
}));

const LPBox = ({ data }) => {
  const box = data.value.components.filter(item => item.type === 'box')[0];
  const style = box;
  const border = box.border === 'yes';
  const classes = useStyles(style);

  return (
    <div>
      {border ? (
        <Box className={classes.border}>
          <BoxTitle data={box.value} />
          <List data={box.value} />
        </Box>
      ) : (
        <Box className={classes.noBorder}>
          <BoxTitle data={box.value} />
          <List data={box.value} />
        </Box>
      )}
    </div>
  );
};

export default LPBox;

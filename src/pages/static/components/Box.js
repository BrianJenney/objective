import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

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
    float: props.desktopStyle.float,
    [theme.breakpoints.down('sm')]: {
      width: props.mobileStyle.width
    }
  })
}));

const SPBox = ({ data, template, type }) => {
  const classes = useStyles(data);
  const border = data.border === 'yes';

  return (
    <div>
      {border ? (
        <Box className={classes.border}>
          <div>TEST</div>
        </Box>
      ) : (
        <Box className={classes.noBorder}>
          <div>TEST</div>
        </Box>
      )}
    </div>
  );
};

export default SPBox;

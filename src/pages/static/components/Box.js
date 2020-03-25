import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import Title from './Title';
import List from './List';

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

const SPBox = ({ data, template, type, comps }) => {
  const classes = useStyles(data);
  const border = data.border === 'yes';
  console.log(comps);

  return (
    <div>
      {border ? (
        <Box className={classes.border}>
          {comps.map(obj => {
            switch (obj.type) {
              case 'boxTitle':
                return <Title data={obj} template={template} type={obj.type} />;
              case 'list':
                return <List data={obj} template={template} type={obj.type} />;
            }
          })}
        </Box>
      ) : (
        <Box className={classes.noBorder}>
          {comps.map(obj => {
            switch (obj.type) {
              case 'boxTitle':
                return <Title data={obj} template={template} type={obj.type} />;
              case 'list':
                return <List data={obj} template={template} type={obj.type} />;
            }
          })}
        </Box>
      )}
    </div>
  );
};

export default SPBox;

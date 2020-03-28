import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import './template-styles.css';

import Title from './Title';
import List from './List';

const useStyles = makeStyles(theme => ({
  border: props => ({
    backgroundColor: props.desktopStyle.bgColor,
    borderColor: props.desktopStyle.borderColor,
    display: props.desktopStyle.display,
    width: props.desktopStyle.width,
    float: props.desktopStyle.float,
    [theme.breakpoints.down('sm')]: {
      width: props.mobileStyle.width
    }
  }),
  noBorder: props => ({
    backgroundColor: props.desktopStyle.bgColor,
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
  const border = data.desktopStyle.border;
  const float = data.desktopStyle.float;

  return (
    <>
      {border ? (
        <Box className={`${classes.border} ${template}-${type} ${template}-${type}-${float}`}>
          {comps.map((obj, i) => {
            switch (obj.type) {
              case 'boxTitle':
                return <Title key={i} data={obj} template={template} type={obj.type} />;
              case 'list':
                return (
                  <List key={i} data={obj} template={template} type={obj.type} symbol={obj.desktopStyle.bulletSymbol} />
                );
            }
          })}
        </Box>
      ) : (
        <Box className={`${classes.noBorder} ${template}-${type}-noBorder ${template}-${type}-noBorder-${float}`}>
          {comps.map((obj, i) => {
            switch (obj.type) {
              case 'boxTitle':
                return <Title key={i} data={obj} template={template} type={obj.type} />;
              case 'list':
                return <List key={i} data={obj} template={template} type={obj.type} />;
            }
          })}
        </Box>
      )}
    </>
  );
};

export default SPBox;

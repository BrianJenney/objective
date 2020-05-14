import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './template-styles.css';

import Title from './Title';
import List from './List';

const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.desktopStyle.bgColor,
    borderColor: props.desktopStyle.borderColor,
    display: props.desktopStyle.display,
    width: props.desktopStyle.width,
    float: props.desktopStyle.float,
    [theme.breakpoints.down('sm')]: {
      width: props.mobileStyle.width,
    },
    [theme.breakpoints.down('xs')]: {
      display: props.mobileStyle.display
    }
  })
}));

const SPBox = ({ data, template, type, comps }) => {
  const classes = useStyles(data);
  const { border, float } = data.desktopStyle;
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const classNames = border
    ? `${classes.root} ${template}-${type} ${template}-${type}-${float}`
    : `${classes.root} ${template}-${type}-noBorder ${template}-${type}-noBorder-${float}`

  return (
    <>
      <Box className={classNames}>
        {comps.map((obj, i) => {
          switch (obj.type) {
            case 'boxTitle':
              return <Title key={i} data={obj} template={template} type={obj.type} />;
            case 'tableContainer':
              const borderPlacement = xs
                ? obj.mobileStyle.borderPlacement
                : obj.desktopStyle.borderPlacement
              return (
                <div className={`${template}-${type}-columnContainer ${template}-${type}-columnContainer-${borderPlacement}`}>
                  {obj.value.components.map((el, i) => {                
                      switch (el.type) {
                          case 'tableHead':
                            return <Title key={i} data={el} template={template} type={el.type} />;
                          case 'tableBody':
                            return (
                              <List key={i} data={el} template={template} type={el.type} symbol={el.desktopStyle.bulletSymbol} />
                            );
                        }
                  })}
                </div>
              );
            case 'list':
              return (
                <List key={i} data={obj} template={template} type={obj.type} symbol={obj.desktopStyle.bulletSymbol} />
              );
          }
        })}
      </Box>
    </>
  );
};

export default SPBox;

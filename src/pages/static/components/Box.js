import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

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
      width: props.mobileStyle.width
    }
  })
}));

const SPBox = ({ data, template, type, comps }) => {
  const classes = useStyles(data);
  const { border, float } = data.desktopStyle;
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
              const borderClassname = obj.desktopStyle.borderPlacement
                ? `${template}-${type}-columnContainer-${obj.desktopStyle.borderPlacement}`
                : `${template}-${type}-columnContainer`
              return (
                <div className={borderClassname}>
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

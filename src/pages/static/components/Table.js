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

const Table = ({ data, template, type, comps }) => {
  const classes = useStyles(data);
  const columns = data.value.components

  return (
    <>
      {columns.map((column, i) => {
          return (
            column.value.components.map((el, i) => {                
                switch (el.type) {
                    case 'tableHead':
                      console.log(el.type)
                      return <Title key={i} data={el} template={template} type={el.type} />;
                    case 'tableBody':
                      return (
                        <List key={i} data={el} template={template} type={el.type} symbol={el.desktopStyle.bulletSymbol} />
                      );
                  }
            })
          )
      })}
    </>
  )
};

export default Table;

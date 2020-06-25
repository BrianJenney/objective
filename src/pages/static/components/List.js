import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: props => ({
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    lineHeight: props.desktopStyle.lineHeight,
    fontFamily: props.desktopStyle.fontFamily,
    paddingLeft: props.desktopStyle.paddingLeft,
    [theme.breakpoints.down('xs')]: {
      color: props.mobileStyle.fontColor,
      fontWeight: props.mobileStyle.fontWeight,
      fontSize: props.mobileStyle.fontSize,
      lineHeight: props.mobileStyle.lineHeight,
      fontFamily: props.mobileStyle.fontFamily,
      paddingLeft: props.mobileStyle.paddingLeft
    }
  })
}));

const List = ({ data, template, type, symbol }) => {
  const classes = useStyles(data);

  return (
    <>
      {symbol ? (
        <div className={`${template}-${type}-ulContainer`}>
          <ul>
            {data.value.map(item => (
              <li
                key={item.id}
                className={`${classes.root} ${template}-${type} ${template}-${type}-${symbol}`}
                dangerouslySetInnerHTML={{ __html: item }}
              ></li>
            ))}
          </ul>
        </div>
      ) : (
        <ol>
          {data.value.map(item => (
            <li key={item.id} className={`${classes.root} ${template}-${type}-ol`}>
              {item}
            </li>
          ))}
        </ol>
      )}
    </>
  );
};

List.propTypes = {
  data: PropTypes.object,
  template: PropTypes.string,
  type: PropTypes.string,
  symbol: PropTypes.string
};

export default List;

import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import { transformDesktopStyle, transformMobileStyle } from '../static/transformComponents';

const commonPropTypes = {
  data: PropTypes.object,
  value: PropTypes.string,
  xs: PropTypes.bool
};

const useStyles = makeStyles(theme => ({
  btn: {
    fontFamily: 'P22Underground',
    fontWeight: '500',
    fontSize: '16px',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.75',
    letterSpacing: 'normal',
    color: '#000000',
    textDecoration: 'underline',
    border: 'none',
    background: 'none',
    outline: 0,
    boxShadow: 'none!important'
  }
}));

const Paragraph = ({ data, value, xs, noBorder, hideText }) => {
  const classes = useStyles(data);
  const charLimit = 150;
  const [expandText, setExpandText] = useState(false);
  const desktopStyles = transformDesktopStyle(data, noBorder);
  const mobileStyles = transformMobileStyle(data);
  let textPadding = '0 0 40px 60px';
  if (desktopStyles.float && desktopStyles.float === 'right') {
    textPadding = '0 0 40px 10px';
  }

  const handleToggle = useCallback(() => {
    setExpandText(!expandText);
  }, [expandText]);

  return value.map((item, i) => {
    if (hideText) {
      const shortenText = value[0].substring(0, charLimit);
      return (
        <>
          <div key={i} style={xs ? mobileStyles : desktopStyles}>
            {!expandText ? <div>{`${shortenText}`}</div> : item}
          </div>
          <div className="button-LP">
            {hideText && (
              <button
                className={classes.btn}
                onClick={handleToggle}
                style={{
                  padding: textPadding
                }}
              >
                {expandText ? 'READ LESS' : 'READ MORE'}
              </button>
            )}
          </div>
        </>
      );
    }
    return (
      <div
        key={i}
        style={xs ? mobileStyles : desktopStyles}
        dangerouslySetInnerHTML={{ __html: item }}
      ></div>
    );
  });
};

Paragraph.propTypes = {
  ...commonPropTypes
};

export default Paragraph;

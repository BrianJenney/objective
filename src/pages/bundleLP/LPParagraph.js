/* eslint-disable import/no-cycle */
/* eslint-disable react/no-danger */
import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import { transformDesktopStyle, transformMobileStyle } from '../static/transformComponents';

const commonPropTypes = {
  data: PropTypes.object,
  value: PropTypes.string,
  xs: PropTypes.bool
};

const useStyles = makeStyles(() => ({
  btn: {
    fontFamily: 'P22-Underground',
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

const LPParagraph = ({ data, value, xs, noBorder, hideText }) => {
  const classes = useStyles(data);
  const charLimit = 150;
  const [expandText, setExpandText] = useState(false);
  const desktopStyles = transformDesktopStyle(data, noBorder);
  const mobileStyles = transformMobileStyle(data);
  let textPadding = '0 0 40px 60px';
  if (desktopStyles.float && desktopStyles.float === 'right') {
    textPadding = '0 70px 40px 130px';
  }

  const handleToggle = useCallback(() => {
    setExpandText(!expandText);
  }, [expandText]);

  const limitText = (text, limit) => {
    let limitIdx;
    for (let i = limit; i < text.length; i += 1) {
      if (text[i] === ' ') {
        limitIdx = i;
        break;
      }
    }
    return text.substring(0, limitIdx);
  };

  return value.map(item => {
    if (hideText) {
      const shortenText = limitText(value[0], charLimit);
      return (
        <>
          <div key={data.name} style={xs ? mobileStyles : desktopStyles}>
            {!expandText ? <div>{`${shortenText}...`}</div> : item}
          </div>
          <div className="button-LP">
            {hideText && (
              <button
                className={classes.btn}
                onClick={handleToggle}
                type="button"
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
        key={data.name}
        id={data.name}
        style={xs ? mobileStyles : desktopStyles}
        dangerouslySetInnerHTML={{ __html: item }}
      ></div>
    );
  });
};

LPParagraph.propTypes = {
  ...commonPropTypes
};

export default LPParagraph;

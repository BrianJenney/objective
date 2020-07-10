import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { transformDesktopStyle, transformMobileStyle } from '../static/transformComponents';

const useStyles = makeStyles(theme => ({
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
        id={data.name}
        style={xs ? mobileStyles : desktopStyles}
        dangerouslySetInnerHTML={{ __html: item }}
      ></div>
    );
  });
};

export default LPParagraph;

import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { transformDesktopStyle, transformMobileStyle } from '../static/transformComponents';

const useStyles = makeStyles(theme => ({
  button: {
    fontFamily: 'P22Underground',
    fontSize: '16px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.75',
    letterSpacing: 'normal',
    color: '#000000',
    textDecoration: 'underline'
  }
}));

const Paragraph = ({ data, value, xs, noBorder, hideText }) => {
  const classes = useStyles(data);
  const charLimit = 150;
  const [expandText, setExpandText] = useState(false);
  const desktopStyles = transformDesktopStyle(data, noBorder);
  const mobileStyles = transformMobileStyle(data);
  let textPadding = '0 0 20px 60px';
  if (desktopStyles.float && desktopStyles.float === 'right') {
    textPadding = '0 0 20px 10px';
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
          <div>
            {hideText && (
              <button
                className={classes.button}
                onClick={handleToggle}
                style={{ padding: textPadding }}
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

  // return value.map((item, i) => (
  //   <div
  //     key={i}
  //     style={xs ? transformMobileStyle(data) : transformDesktopStyle(data, noBorder)}
  //     dangerouslySetInnerHTML={{ __html: item }}
  //   ></div>
  // ));
};

export default Paragraph;

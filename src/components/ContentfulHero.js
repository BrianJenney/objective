import React, { useState, useEffect } from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './ContentfulHero.scss';

const posValues = {
  topLeft: {
    top: '12%',
    left: '10%'
  },
  bottomLeft: {
    bottom: '12%',
    left: '10%'
  },
  topRight: {
    top: '12%',
    right: '10%'
  },
  bottomRight: {
    bottom: '12%',
    right: '10%'
  },
  center: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

const optionsDev = {
  assets: {
    desktopHero: 'http://cdn1.stopagingnow.com/objective/assets/desktop-cropped.png',
    mobileHero: 'http://cdn1.stopagingnow.com/objective/assets/mobile-cropped.png'
  },
  heroContainer: {
    width: '100%',
    position: 'relative',
    textAlign: 'center'
  },
  ctaDiv: {
    color: 'white',
    height: 237,
    // backgroundColor: 'red',
    background: 'none',
    position: 'absolute',
    ...posValues.topLeft
  },
  imageBox: {
    width: '100%',
    zIndex: 1
  },
  underline: {
    height: 2,
    marginTop: 3,
    marginBottom: 5,
    backgroundColor: 'white'
  }
};

const ContentfulHero = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [typedStr, setTypedStr] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  let interval;

  const image = sm ? optionsDev.assets.mobileHero : optionsDev.assets.desktopHero;

  // This helper function calculates how long the line under typewriter effect should be
  const getBoxWidth = arr => {
    const lengths = arr.map(ele => ele.length);
    return `${Math.max(...lengths) / 2 - 0.5}em`;
  };

  const leadText = 'Back to...';
  const phrases = ['alarm clocks', 'better sleep', 'longer string length'];
  const buttonText = 'SHOP ALL';
  const boxWidth = getBoxWidth(phrases);

  useEffect(() => {
    const tempo = deleting ? 75 : 150;
    interval = setInterval(() => {
      type();
    }, tempo);
  }, [loopIndex, deleting]);

  const type = () => {
    const phrasesIndex = loopIndex % phrases.length;
    const fullStr = phrases[phrasesIndex];
    let subStr;

    setTypedStr(prev => {
      subStr = fullStr.substring(0, prev.length);
      if (subStr.length < fullStr.length && !deleting) {
        subStr = fullStr.substring(0, prev.length + 1);
      } else if (subStr.length >= fullStr.length || deleting) {
        if (subStr.length === fullStr.length && !deleting) {
          clearInterval(interval);
          setTimeout(() => {
            setDeleting(true);
          }, 1250);
        } else if (deleting && subStr === '') {
          clearInterval(interval);
          setLoopIndex(prevLoopIndex => prevLoopIndex + 1);
          setDeleting(false);
        } else {
          subStr = fullStr.substring(0, prev.length - 1);
        }
      }
      return subStr;
    });
  };

  const renderCtaButton = () => <div>{buttonText}</div>;

  const renderDynamicText = () => (
    <div className="typewriter" style={{ textAlign: 'left' }}>
      {typedStr}
      <span id="blinking-caret" style={{ ...optionsDev.caret }}>
        |
      </span>
    </div>
  );

  const renderLeadingText = () => <div>{leadText}</div>;

  const Result = () => (
    <div style={{ ...optionsDev.heroContainer }}>
      <img alt="test" src={image} style={{ ...optionsDev.imageBox }}></img>
      <div style={{ ...optionsDev.ctaDiv, width: boxWidth }}>
        {renderLeadingText()}
        {renderDynamicText()}
        <div style={{ ...optionsDev.underline, width: boxWidth }}></div>
        {renderCtaButton()}
      </div>
    </div>
  );

  return <Result />;
};

export default ContentfulHero;

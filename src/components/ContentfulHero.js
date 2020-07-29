import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typed from 'typed.js';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './ContentfulHero.scss';

const posValues = {
  topLeft: {
    top: '15%',
    left: '5%'
  },
  bottomLeft: {
    bottom: '15%',
    left: '5%'
  },
  topRight: {
    top: '15%',
    right: '5%'
  },
  bottomRight: {
    bottom: '15%',
    right: '15%'
  },
  center: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  mobile: {
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

const mobileStyles = {
  assets: {
    hero: 'http://cdn1.stopagingnow.com/objective/assets/mobile-cropped.png'
  },
  heroContainer: {
    width: '100%',
    position: 'relative',
    textAlign: 'center'
  },
  ctaDiv: {
    color: 'white',
    height: 200,
    background: 'none',
    position: 'absolute',
    ...posValues.mobile
  },
  imageBox: {
    width: '100%',
    zIndex: 1,
    margin: 0
  },
  underline: {
    height: 4,
    backgroundColor: 'black',
    width: '100%',
    position: 'absolute',
    top: 90
  },
  leadingText: {
    fontFamily: 'FreightTextProBook',
    color: 'black',
    fontSize: 58,
    position: 'relative'
  },
  typedText: {
    marginTop: 20,
    height: 64,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    fontSize: 48,
    lineHeight: 'normal'
  },
  caret: {
    marginLeft: 5,
    borderRight: '3px solid white'
  },
  button: {
    marginTop: -5,
    border: 'none',
    width: '100%',
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 900,
    padding: '12px',
    letterSpacing: '1.33px',
    lineHeight: 2.14,
    fontSize: 16,
    height: '55px',
    backgroundColor: '#F7C6B1'
  }
};

const desktopStyles = {
  assets: {
    hero: 'http://cdn1.stopagingnow.com/objective/assets/desktop-cropped.png'
  },
  heroContainer: {
    width: '100%',
    position: 'relative',
    textAlign: 'center'
  },
  ctaDiv: {
    color: 'white',
    height: 200,
    background: 'none',
    position: 'absolute',
    ...posValues.topLeft
  },
  imageBox: {
    width: '100%',
    zIndex: 1
  },
  underline: {
    height: 4,
    backgroundColor: 'black',
    width: '100%',
    position: 'absolute',
    top: 90
  },
  leadingText: {
    fontFamily: 'FreightTextProBook',
    color: 'black',
    fontSize: 58,
    position: 'relative'
  },
  typedText: {
    marginTop: 20,
    height: 64,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    fontSize: 48,
    lineHeight: 'normal'
  },
  caret: {
    marginLeft: 5,
    borderRight: '3px solid white'
  },
  button: {
    marginTop: 14,
    fontFamily: 'p22-underground, Helvetica, sans',
    border: 'none',
    fontWeight: 900,
    padding: '12px',
    letterSpacing: '1.33px',
    lineHeight: 2.14,
    fontSize: 16,
    height: '55px',
    backgroundColor: '#F7C6B1'
  }
};

const ContentfulHero = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  let segmentProperties;

  const styleOptions = sm ? mobileStyles : desktopStyles;

  const image = styleOptions.assets.hero;

  // Calculate width based on longest supplied string:
  const getBoxWidth = arr => {
    const lengths = arr.map(ele => ele.length);
    return `${Math.max(...lengths) * 1.5}em`;
  };

  // Prepare typewriter variables:
  const strings = ['alarm clocks', 'better sleep'];
  // const strings = ['alarm clocks'];
  const leadingText = 'Back to...';
  const options = {
    typeSpeed: 120,
    showCursor: false,
    backSpeed: 60,
    backDelay: 850,
    loop: strings.length > 1,
    strings
  };
  const buttonText = 'SHOP ALL';
  const boxWidth = getBoxWidth(strings);

  useEffect(() => {
    const Typewriter = () => new Typed('.typewriter', options);
    Typewriter();
  });

  const segmentTrackBannerClicked = () =>
    window.analytics.track('Banner Clicked', segmentProperties);

  const renderCtaButton = () => (
    <Link
      to="/gallery"
      segmentProperties={{
        cta: 'Shop All',
        destination: '/gallery',
        site_location: 'home',
        text: 'SHOP NOW'
      }}
      onClick={segmentTrackBannerClicked}
    >
      <button type="button" style={{ ...styleOptions.button }}>
        {buttonText}
      </button>
    </Link>
  );

  const renderTypedText = () => (
    <div style={{ ...styleOptions.typedText }}>
      <div className="typewriter" id="typedstr" style={{ marginLeft: 3 }}></div>
      <div style={{ ...styleOptions.underline }}></div>
    </div>
  );

  const renderLeadingText = () => <div style={{ ...styleOptions.leadingText }}>{leadingText}</div>;

  const Result = () => (
    <div style={{ ...styleOptions.heroContainer }}>
      <img alt="test" src={image} style={{ ...styleOptions.imageBox }}></img>
      <div style={{ ...styleOptions.ctaDiv, width: boxWidth }}>
        {renderLeadingText()}
        {renderTypedText()}
        {sm ? null : renderCtaButton()}
      </div>
      {sm ? renderCtaButton() : null}
    </div>
  );

  return <Result />;
};

export default ContentfulHero;

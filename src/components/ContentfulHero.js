import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typed from 'typed.js';
import SwitchLink from './common/SwitchLink';

// Dictionary to translate contentful entry to aboslute position:
const posValues = {
  topLeft: {
    top: '20%',
    left: '6%'
  },
  bottomLeft: {
    bottom: '10%',
    left: '6%'
  },
  topRight: {
    top: '20%',
    right: '6%'
  },
  bottomRight: {
    bottom: '10%',
    right: '6%'
  },
  center: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  topCenter: {
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

const sharedStyles = {
  heroContainer: {
    width: '100%',
    position: 'relative',
    textAlign: 'center'
  },
  ctaBox: {
    color: 'white',
    height: 200,
    background: 'none',
    position: 'absolute'
  },
  imageBox: {
    width: '100%'
  },
  leadingText: {
    fontFamily: 'FreightTextProBook',
    color: 'black',
    fontSize: 58,
    position: 'relative'
  },
  typedText: {
    height: 64,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    lineHeight: 'normal'
  }
};

const screenreaderStyles = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  width: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap'
};

const mobileStyles = {
  ...sharedStyles,
  assets: {
    hero: 'http://cdn1.stopagingnow.com/objective/assets/mobile-cropped.png',
    alt: 'Alt text'
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
    cursor: 'pointer'
  },
  leadingText: {
    fontSize: 40
  },
  typedText: {
    height: 64,
    display: 'flex',
    marginTop: 20,
    fontSize: 38,
    flexDirection: 'column',
    textAlign: 'left',
    lineHeight: 'normal'
  },
  underline: {
    height: 4,
    backgroundColor: 'black',
    width: '100%',
    position: 'absolute',
    top: 80
  }
};

const desktopStyles = {
  ...sharedStyles,
  assets: {
    hero: 'http://cdn1.stopagingnow.com/objective/assets/desktop-cropped.png',
    alt: 'Alt text'
  },
  button: {
    marginTop: 10,
    fontFamily: 'p22-underground, Helvetica, sans',
    border: 'none',
    fontWeight: 900,
    padding: '12px',
    letterSpacing: '1.33px',
    lineHeight: 2.14,
    fontSize: 16,
    height: '55px',
    cursor: 'pointer'
  },
  leadingText: {
    fontSize: 58
  },
  typedText: {
    height: 64,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    lineHeight: 'normal'
  },
  underline: {
    height: 4,
    backgroundColor: 'black',
    width: '100%',
    position: 'absolute',
    top: 90
  }
};

const mapContentfulValues = content => {
  desktopStyles.assets.hero = content.desktopImage.fields.file.url;
  mobileStyles.assets.hero = content.mobileImage.fields.file.url;
  desktopStyles.assets.alt = content.desktopImage.fields.title;
  mobileStyles.assets.alt = content.mobileImage.fields.title;

  desktopStyles.ctaBox = { ...desktopStyles.ctaBox, ...posValues[content.desktopCtaPlacement] };
  mobileStyles.ctaBox = { ...mobileStyles.ctaBox, ...posValues[content.mobileCtaPlacement] };

  sharedStyles.leadingText.fontFamily = content.leadingTextFontFamily;
  sharedStyles.leadingText.color = content.leadingTextFontColor;
  desktopStyles.leadingText.fontSize = content.leadingTextFontSize;

  sharedStyles.typedText.fontFamily = content.typedTextFontFamily;
  sharedStyles.typedText.color = content.typedTextFontColor;
  desktopStyles.typedText.fontSize = content.typedTextFontSize;

  desktopStyles.button.backgroundColor = content.buttonColor;
  mobileStyles.button.backgroundColor = content.buttonColor;
  desktopStyles.button.color = content.buttonFontColor;
  mobileStyles.button.color = content.buttonFontColor;
};

const ContentfulHero = ({ content }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = sm ? mobileStyles : desktopStyles;
  let segmentProperties;

  // Calculate width based on longest supplied string:
  const getBoxWidth = arr => {
    const lengths = arr.map(ele => ele.length);
    const multiplier = sm ? 1.16 : 1.46;
    return `${Math.max(...lengths) * multiplier}em`;
  };

  // Handle Contentful value assignments:
  mapContentfulValues(content);
  const image = styles.assets.hero;
  const altText = styles.assets.alt;
  const { leadingText, typedText, buttonText, buttonDestination } = content;
  const boxWidth = getBoxWidth(typedText);

  const typewriterOptions = {
    typeSpeed: 120,
    showCursor: false,
    backSpeed: 60,
    backDelay: 850,
    loop: typedText.length > 1,
    strings: typedText
  };

  useEffect(() => {
    const Typewriter = () => new Typed('#typingBox', typewriterOptions);
    Typewriter();
  });

  const segmentTrackBannerClicked = () =>
    window.analytics.track('Banner Clicked', segmentProperties);

  const renderCtaButton = () => {
    const buttonContent = (
      <button type="button" style={{ ...styles.button }}>
        {buttonText}
      </button>
    );
    return (
      <SwitchLink
        to={buttonDestination}
        content={buttonContent}
        segmentProperties={{
          cta: 'Shop All',
          destination: buttonDestination,
          site_location: 'home',
          text: 'SHOP NOW'
        }}
        onClick={segmentTrackBannerClicked}
      ></SwitchLink>
    );
  };

  const renderAccessibleText = () => typedText.map(string => <li>{string}</li>);

  const renderTypedText = () => (
    <div style={{ ...styles.typedText }}>
      <div aria-hidden="true" id="typingBox" style={{ marginLeft: 3 }}></div>
      <ul style={{ ...screenreaderStyles }}>{renderAccessibleText()}</ul>
      <div style={{ ...styles.underline }}></div>
    </div>
  );

  const renderLeadingText = () => <div style={{ ...styles.leadingText }}>{leadingText}</div>;

  const Result = () => (
    <div style={{ ...styles.heroContainer }}>
      <img alt={altText} src={image} style={{ ...styles.imageBox }}></img>
      <div style={{ ...styles.ctaBox, width: boxWidth }}>
        {renderLeadingText()}
        {renderTypedText()}
        {sm ? null : renderCtaButton()}
      </div>
      {sm ? renderCtaButton() : null}
    </div>
  );

  return <Result />;
};

ContentfulHero.propTypes = {
  content: PropTypes.object
};

export default ContentfulHero;

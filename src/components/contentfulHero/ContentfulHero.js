import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typed from 'typed.js';
import SwitchLink from '../common/SwitchLink';

import {
  posValues,
  desktopStyles,
  mobileStyles,
  screenreaderStyles
} from './styles/contentfulHeroStyles';

const mapContentfulValues = content => {
  desktopStyles.assets.hero = content.desktopImage.fields.file.url;
  mobileStyles.assets.hero = content.mobileImage.fields.file.url;
  desktopStyles.assets.alt = content.desktopImage.fields.title;
  mobileStyles.assets.alt = content.mobileImage.fields.title;

  desktopStyles.ctaBox = { ...desktopStyles.ctaBox, ...posValues[content.desktopCtaPlacement] };
  mobileStyles.ctaBox = { ...mobileStyles.ctaBox, ...posValues[content.mobileCtaPlacement] };

  mobileStyles.leadingText.fontFamily = content.leadingTextFontFamily;
  mobileStyles.leadingText.color = content.leadingTextFontColor;
  desktopStyles.leadingText.fontFamily = content.leadingTextFontFamily;
  desktopStyles.leadingText.color = content.leadingTextFontColor;
  desktopStyles.leadingText.fontSize = content.leadingTextFontSize;

  mobileStyles.typedText.fontFamily = content.typedTextFontFamily;
  mobileStyles.typedText.color = content.typedTextFontColor;
  desktopStyles.typedText.fontFamily = content.typedTextFontFamily;
  desktopStyles.typedText.color = content.typedTextFontColor;
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

  const segmentProperties = {
    cta: buttonText,
    destination: buttonDestination,
    site_location: 'home',
    text: `${leadingText} ${typedText.join(', ')} - ${buttonText}`
  };

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
        onClick={segmentTrackBannerClicked}
      ></SwitchLink>
    );
  };

  const renderAccessibleText = () => typedText.map(text => <li>{text}</li>);

  const renderTypedText = () => (
    <div style={{ ...styles.typedText }}>
      <div aria-hidden="true" id="typingBox" style={{ marginLeft: 3 }}></div>
      <ul style={{ ...screenreaderStyles }}>{renderAccessibleText()}</ul>
      <div style={{ ...styles.underline }}></div>
    </div>
  );

  const renderLeadingText = () => <div style={{ ...styles.leadingText }}>{leadingText}</div>;

  const Hero = () => (
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

  return <Hero />;
};

ContentfulHero.propTypes = {
  content: PropTypes.object
};

export default ContentfulHero;

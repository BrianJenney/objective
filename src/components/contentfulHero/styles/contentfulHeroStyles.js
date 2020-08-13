// Dictionary to translate contentful entry to aboslute position:
export const posValues = {
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
    top: '32%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

export const sharedStyles = {
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
  }
};

export const screenreaderStyles = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  width: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap'
};

export const mobileStyles = {
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
    fontFamily: 'FreightTextProBook',
    color: 'black',
    fontSize: 40,
    position: 'relative'
  },
  typedText: {
    height: 64,
    display: 'flex',
    marginTop: 12,
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
    top: 72
  }
};

export const desktopStyles = {
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
    fontFamily: 'FreightTextProBook',
    color: 'black',
    fontSize: 58,
    position: 'relative'
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

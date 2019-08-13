const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const utils = {
  validateEmailAddress: address => emailRegex.test(address)
};

export default utils;

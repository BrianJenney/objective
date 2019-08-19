import store from '../../store';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const utils = {
  validateEmailAddress: address => emailRegex.test(address),

  isLoggedIn: () => {
    return typeof store.getState().account._id !== 'undefined';
  }
};

export default utils;

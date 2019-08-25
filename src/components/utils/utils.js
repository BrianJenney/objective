import store from '../../store';

const localStorageClient = require('store');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const utils = {
  validateEmailAddress: address => emailRegex.test(address),

  isLoggedIn: () => {
    return typeof localStorageClient.get('token') !== 'undefined';
  }
};

export default utils;

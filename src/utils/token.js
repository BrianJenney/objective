const jwt = require('jsonwebtoken');

export const createAnonymousToken = () => {
  const token = jwt.sign({
    store_code: process.env.REACT_APP_STORE_CODE,
    account_type: 'anonymous'
  }, process.env.REACT_APP_JWT_SECRET);

  return token;
};

export const validateToken = token => {
  jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
    if (err) {
      return false;
    }

    if (decoded) {
      return decoded;
    }
  });

  return false;
};
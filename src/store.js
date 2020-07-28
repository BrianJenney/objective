import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import stompReducer from './modules/stomp/reducers';
import storefrontReducer from './modules/storefront/reducers';
import cartReducer from './modules/cart/reducers';
import accountReducer from './modules/account/reducers';
import orderReducer from './modules/order/reducers';
import catalogReducer from './modules/catalog/reducers';
import utilsReducer from './modules/utils/reducers';
import staticReducers from './modules/static/reducers';
import paypalReducer from './modules/paypal/reducers';
import EventEmitter from './events';

const rootReducer = combineReducers({
  stomp: stompReducer,
  storefront: storefrontReducer,
  cart: cartReducer,
  account: accountReducer,
  order: orderReducer,
  catalog: catalogReducer,
  utils: utilsReducer,
  page: staticReducers,
  paypal: paypalReducer
});

// Emits store dispatch events
const reduxStoreEvents = store => next => action => {
  EventEmitter.emit(action.type, { payload: action.payload, state: store.getState() });
  return next(action);
};

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk, reduxStoreEvents))
);

export default store;

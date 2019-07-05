import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import stompReducer from './modules/stomp/reducers';
import storefrontReducer from './modules/storefront/reducers';
import cartReducer from './modules/cart/reducers';
import accountReducer from './modules/account/reducers';

const rootReducer = combineReducers({
  stomp: stompReducer,
  storefront: storefrontReducer,
  cart: cartReducer,
  account: accountReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
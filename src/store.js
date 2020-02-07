import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import stompReducer from './modules/stomp/reducers';
import storefrontReducer from './modules/storefront/reducers';
import cartReducer from './modules/cart/reducers';
import accountReducer from './modules/account/reducers';
import orderReducer from './modules/order/reducers';
import catalogReducer from './modules/catalog/reducers';
import utilsReducer from './modules/utils/reducers';

const rootReducer = combineReducers({
  stomp: stompReducer,
  storefront: storefrontReducer,
  cart: cartReducer,
  account: accountReducer,
  order: orderReducer,
  catalog: catalogReducer,
  utils: utilsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;

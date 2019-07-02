import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import stompReducer from './modules/stomp/reducers';
import storefrontReducer from './modules/storefront/reducers';
import contentReducer from './modules/content/reducers';
import productReducer from './modules/products/reducers';
import userReducer from './modules/account/reducers';

const rootReducer = combineReducers({
  stomp: stompReducer,
  storefront: storefrontReducer,
  content: contentReducer,
  products: productReducer,
  users: userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
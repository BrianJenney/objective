import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import contentReducer from './modules/content/reducers';
import pdpReducer from './modules/pdp/reducers';
import productReducer from './modules/products/reducers';
import stompReducer from './modules/stomp/reducers';
import storefrontReducer from './modules/storefront/reducers';


const rootReducer = combineReducers({
  pdp: pdpReducer,
  stomp: stompReducer,
  storefront: storefrontReducer,
  content: contentReducer,
  products: productReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
import { 
  REQUEST_CREATE_ORDER,
  RECEIVED_CREATE_ORDER
} from './types';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CREATE_ORDER:
    return { ...state };
  case RECEIVED_CREATE_ORDER:
    console.log(action.payload);
    return { ...state, ...action.payload };
  default:
    return state;
  }
}; 
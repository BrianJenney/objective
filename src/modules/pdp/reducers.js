import { 
  REQUEST_VARIANTS, 
  RECEIVED_VARIANTS 
} from './types';

const INITIAL_STATE = {
  variants: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_VARIANTS:
              return { ...state };
        case RECEIVED_VARIANTS:
          return Object.assign({}, state, {
            variants: action.payload
          });
        default:
            return state;
    }
};
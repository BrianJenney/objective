import { REQUEST_FETCH_PRODUCTS, RECEIVED_FETCH_PRODUCTS} from './types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_FETCH_PRODUCTS:
            return { ...state };
        case RECEIVED_FETCH_PRODUCTS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
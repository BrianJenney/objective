import { REQUEST_STOREFRONT, RECEIVED_STOREFRONT } from '../constants/action-types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_STOREFRONT:
            return { ...state };
        case RECEIVED_STOREFRONT:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
import { FETCH_STOREFRONT } from '../constants/action-types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_STOREFRONT:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
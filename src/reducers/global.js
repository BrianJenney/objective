import { INITIALIZE_APP } from '../constants/action-types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INITIALIZE_APP:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
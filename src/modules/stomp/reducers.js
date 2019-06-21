import { CONNECT_STOMP } from './types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONNECT_STOMP:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
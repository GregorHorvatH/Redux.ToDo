// Core
import { List, fromJS } from 'immutable';

// Instruments
import types from '../../actions/todos/types';

const initialState = List([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TODOS_SUCCESS:
            return fromJS(action.payload.result);

        case types.CREATE_TODO_SUCCESS:
            return state.unshift(fromJS(action.payload.result));

        case types.DELETE_TODO_SUCCESS:
            return state.filter((item) => item !== action.payload);

        default:
            return state;
    }
};

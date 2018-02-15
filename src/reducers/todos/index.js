// Core
// import { Map, fromJS } from 'immutable';

// Instruments
import types from '../../actions/todos/types';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TODOS:
            return action.payload;

        case types.FETCH_TODOS_SUCCESS:
            return action.payload;

        case types.CREATE_TODO_SUCCESS:
            return [
                action.payload,
                ...state
            ];

        case types.UPDATE_TODO_SUCCESS:
            return state.map((item1) => ({
                ...item1,
                ...action.payload.find((item2) => item2.id === item1.id),
            }));

        case types.DELETE_TODO_SUCCESS:
            return state.filter(
                (todo) => todo.id !== action.payload
            );

        case types.FETCH_TODOS_FAIL:
        case types.CREATE_TODO_FAIL:
        case types.DELETE_TODO_FAIL:
        case types.UPDATE_TODO_FAIL:
        default:
            return state;
    }
};
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
            return state.filter(
                (item) => item !== action.payload
            );

        case types.UPDATE_TODO_SUCCESS:
            return state.map((item1) => {
                const newItem = action.payload.find(
                    (item2) => item2.id === item1.get('id')
                );

                return newItem ? fromJS(newItem) : item1;
            });

        default:
            return state;
    }
};

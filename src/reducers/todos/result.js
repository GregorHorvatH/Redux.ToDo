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
            debugger;

            return state.insert(fromJS(action.payload.result));

        case types.UPDATE_TODO_SUCCESS:
            return state.map((item1) => {
                const newItem = action.payload.find(
                    (item2) => item2.id === item1.get('id')
                );

                return newItem ? fromJS(newItem) : item1;
            });
            // .sort(favoritesFirst)
            // .sort(completeLast);

        case types.DELETE_TODO_SUCCESS:
            return state.shift(action.payload);

        default:
            return state;
    }
};

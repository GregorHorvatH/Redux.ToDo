// Core
import { Map, fromJS } from 'immutable';

// Instruments
import types from '../../actions/todos/types';

const initialState = Map({});

export default (state = initialState, action) => {
    const newTodos = action && action.payload && action.payload.entities && action.payload.entities.todo
        ? action.payload.entities.todo
        : initialState;

    switch (action.type) {
        case types.FETCH_TODOS_SUCCESS:
            return fromJS(newTodos);

        case types.CREATE_TODO_SUCCESS:
            return state.merge(newTodos);

        case types.DELETE_TODO_SUCCESS:
            return state.delete(action.payload);

        case types.UPDATE_TODO_SUCCESS:
            return state.map(
                (item) => fromJS(
                    newTodos[item.get('id')]
                ) || item
            );

        default:
            return state;
    }
};

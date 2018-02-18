// Core
import { List, fromJS } from 'immutable';

// Instruments
import types from '../../actions/todos/types';

const favoritesFirst = (todo1, todo2) => {
    if (todo1.favorite && !todo2.favorite) {
        return -1;
    }

    if (!todo1.favorite && todo2.favorite) {
        return 1;
    }

    return 0;
};

const completeLast = (todo1, todo2) => {
    if (todo1.completed && !todo2.completed) {
        return 1;
    }

    if (!todo1.completed && todo2.completed) {
        return -1;
    }

    return 0;
};

const initialState = List([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TODOS_SUCCESS:
            return fromJS(
                action.payload.result
                    .map((item) => action.payload.entities.todo[item])
                    .sort(favoritesFirst)
                    .sort(completeLast)
                    .map((item) => item.id)
            );

        case types.CREATE_TODO_SUCCESS:
            return state.unshift(fromJS(action.payload.result));
            // TODO: sort

        case types.DELETE_TODO_SUCCESS:
            return state.filter((item) => item !== action.payload);

        case types.UPDATE_TODO_SUCCESS:
            return state;
            // TODO: sort

        default:
            return state;
    }
};

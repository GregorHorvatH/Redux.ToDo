// Core
import { List, fromJS } from 'immutable';

// Instruments
import types from '../../actions/todos/types';

const initialState = List([]);

const favoritesFirst = (todo1, todo2) => {
    if (todo1.get('favorites') && !todo2.get('favorites')) {
        return -1;
    }

    if (!todo1.get('favorites') && todo2.get('favorites')) {
        return 1;
    }

    return 0;
};

const completeLast = (todo1, todo2) => {
    if (todo1.get('completed') && !todo2.get('completed')) {
        return 1;
    }

    if (!todo1.get('completed') && todo2.get('completed')) {
        return -1;
    }

    return 0;
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TODOS_SUCCESS:
            return fromJS(action.payload)
                .sort(favoritesFirst)
                .sort(completeLast);

        case types.CREATE_TODO_SUCCESS:
            return state.unshift(fromJS(action.payload))
                .sort(favoritesFirst)
                .sort(completeLast);

        case types.UPDATE_TODO_SUCCESS:
            return state.map((item1) => fromJS({
                ...item1.toJS(),
                ...action.payload.find(
                    (item2) => item2.id === item1.get('id')
                ),
            }))
                .sort(favoritesFirst)
                .sort(completeLast);

        case types.DELETE_TODO_SUCCESS:
            return state.filter(
                (todo) => todo.get('id') !== action.payload
            )
                .sort(favoritesFirst)
                .sort(completeLast);

        default:
            return state;
    }
};

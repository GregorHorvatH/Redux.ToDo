// Core
// import { Map, fromJS } from 'immutable';

// Instruments
import types from '../../actions/todos/types';

const initialState = [];

const favoritesFirst = (todo1, todo2) => {
    if (todo1.favorites && !todo2.favorites) {
        return -1;
    }

    if (!todo1.favorites && todo2.favorites) {
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

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TODOS:
            return action.payload.sort(favoritesFirst).sort(completeLast);

        case types.FETCH_TODOS_SUCCESS:
            return action.payload.sort(favoritesFirst).sort(completeLast);

        case types.CREATE_TODO_SUCCESS:
            return [
                action.payload,
                ...state
            ].sort(favoritesFirst).sort(completeLast);

        case types.UPDATE_TODO_SUCCESS:
            return state.map((item1) => ({
                ...item1,
                ...action.payload.find((item2) => item2.id === item1.id),
            })).sort(favoritesFirst).sort(completeLast);

        case types.DELETE_TODO_SUCCESS:
            return state.filter(
                (todo) => todo.id !== action.payload
            ).sort(favoritesFirst).sort(completeLast);

        default:
            return state;
    }
};

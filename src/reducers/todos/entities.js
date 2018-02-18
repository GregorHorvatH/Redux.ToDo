// Core
import { Map, fromJS } from 'immutable';

// Instruments
import types from '../../actions/todos/types';

const initialState = Map({});

const favoritesFirst = (todo1, todo2) => {
    if (todo1.get('favorite') && !todo2.get('favorite')) {
        return -1;
    }

    if (!todo1.get('favorite') && todo2.get('favorite')) {
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
            return fromJS(action.payload.entities.todo);

        case types.CREATE_TODO_SUCCESS:
            debugger;

            return state.set(
                action.payload.entities.todo.id,
                fromJS(action.payload.entities.todo)
            );
                // .sort(favoritesFirst)
                // .sort(completeLast);

        case types.UPDATE_TODO_SUCCESS:
            return state.map((item1) => {
                const newItem = action.payload.find(
                    (item2) => item2.id === item1.get('id')
                );

                return newItem ? fromJS(newItem) : item1;
            })
                .sort(favoritesFirst)
                .sort(completeLast);

        case types.DELETE_TODO_SUCCESS:
            return state.delete(action.payload);

        default:
            return state;
    }
};

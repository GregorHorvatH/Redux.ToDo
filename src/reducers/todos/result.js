// Core
import { List, fromJS } from 'immutable';

// Instruments
import types from '../../actions/todos/types';

// const favoritesFirst = (todo1, todo2) => {
//     if (todo1.get('favorite') && !todo2.get('favorite')) {
//         return -1;
//     }

//     if (!todo1.get('favorite') && todo2.get('favorite')) {
//         return 1;
//     }

//     return 0;
// };

// const completeLast = (todo1, todo2) => {
//     if (todo1.get('completed') && !todo2.get('completed')) {
//         return 1;
//     }

//     if (!todo1.get('completed') && todo2.get('completed')) {
//         return -1;
//     }

//     return 0;
// };


const initialState = List([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TODOS_SUCCESS:
            return fromJS(action.payload.result);
            // TODO: sort

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

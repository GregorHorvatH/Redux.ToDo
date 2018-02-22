// Core
import { Map } from 'immutable';

// Instruments
import types from '../../actions/ui/types';

const initialState = Map({
    todoFetching: false,
    errorMessage: 'my error message',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.START_TODOS_FETCHING:
            return state.set('todoFetching', true);

        case types.STOP_TODOS_FETCHING:
            return state.set('todoFetching', false);

        default:
            return state;
    }
};

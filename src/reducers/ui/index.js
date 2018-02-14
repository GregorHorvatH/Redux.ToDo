// Core
import { Record } from 'immutable';

// Instruments
import types from '../../actions/ui/types';

const initialState = new Record({
    todoFetching: false,
})();

export default (state = initialState, action) => {
    switch (action.type) {
        case types.START_TODO_FETCHING:
            return state.set('todoFetching', true);

        case types.STOP_TODO_FETCHING:
            return state.set('todoFetching', false);

        default:
            return state;
    }
};

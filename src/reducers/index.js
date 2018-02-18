// Core
import { combineReducers } from 'redux';

// Instruments
import todos from './todos';

function lastAction (state, action) {
    return action;
}

export default combineReducers({
    todos,
    lastAction,
});

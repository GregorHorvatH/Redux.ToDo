// Core
import { combineReducers } from 'redux';

// Instruments
import todos from './todos';
import ui from './ui';

function lastAction (state, action) {
    return action;
}

export default combineReducers({
    todos,
    ui,
    lastAction,
});

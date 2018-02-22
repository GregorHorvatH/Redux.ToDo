// Core
import { combineReducers } from 'redux';

// Instruments
import todos from './todos';
import ui from './ui';
import forms from './forms';

function lastAction (state, action) {
    return action;
}

export default combineReducers({
    todos,
    ui,
    forms,
    lastAction,
});

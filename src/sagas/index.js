// Core
import { all } from 'redux-saga/effects';

// Instruments
import todos from './todos';

export function* saga () {
    yield all([
        todos.fetchTodosWatcher(),
        todos.createTodoWatcher(),
        todos.updateTodoWatcher(),
        todos.deleteTodoWatcher(),
        todos.changePriorityWatcher()
    ]);
}

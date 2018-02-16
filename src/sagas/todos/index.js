// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import types from '../../actions/todos/types';
import { fetchTodosWorker } from './workers/fetchTodos';
import { createTodoWorker } from './workers/createTodo';
import { updateTodoWorker } from './workers/updateTodo';
import { deleteTodoWorker } from './workers/deleteTodo';
import { changePriorityWorker } from './workers/changePriority';
import { completeWorker } from './workers/complete';
import { completeAllWorker } from './workers/completeAll';

export default Object.freeze({
    * fetchTodosWatcher () {
        yield takeEvery(types.FETCH_TODOS, fetchTodosWorker);
    },
    * createTodoWatcher () {
        yield takeEvery(types.CREATE_TODO, createTodoWorker);
    },
    * updateTodoWatcher () {
        yield takeEvery(types.UPDATE_TODO, updateTodoWorker);
    },
    * deleteTodoWatcher () {
        yield takeEvery(types.DELETE_TODO, deleteTodoWorker);
    },
    * changePriorityWatcher () {
        yield takeEvery(types.CHANGE_PRIORITY, changePriorityWorker);
    },
    * completeWatcher () {
        yield takeEvery(types.COMPLETE, completeWorker);
    },
    * completeAllWatcher () {
        yield takeEvery(types.COMPLETE_ALL, completeAllWorker);
    },
});

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
    * fetchTodosWatcher () { // метод объекта генератор
        yield takeEvery(types.FETCH_TODOS, fetchTodosWorker);
    },
    * createTodoWatcher () { // метод объекта генератор
        yield takeEvery(types.CREATE_TODO, createTodoWorker);
    },
    * updateTodoWatcher () { // метод объекта генератор
        yield takeEvery(types.UPDATE_TODO, updateTodoWorker);
    },
    * deleteTodoWatcher () { // метод объекта генератор
        yield takeEvery(types.DELETE_TODO, deleteTodoWorker);
    },
    * changePriorityWatcher () { // метод объекта генератор
        yield takeEvery(types.CHANGE_PRIORITY, changePriorityWorker);
    },
    * completeWatcher () { // метод объекта генератор
        yield takeEvery(types.COMPLETE, completeWorker);
    },
    * completeAllWatcher () { // метод объекта генератор
        yield takeEvery(types.COMPLETE_ALL, completeAllWorker);
    },
});

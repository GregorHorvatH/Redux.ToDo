// Core
import { put, call } from 'redux-saga/effects';
// import { normalize } from 'normalizr';

// Instruments
import uiActions from '../../../../actions/ui';
import { api, token } from '../../../../instruments/api';
import todosActions from '../../../../actions/todos';
// import { post as postSchema } from '../../../../schemas';

export function* fetchTodosWorker () {
    try {
        yield put(uiActions.startTodosFetching());

        const response = yield call(fetch, `${api}`, {
            method:  'GET',
            headers: {
                'Authorization': token,
            },
        });

        const { data: todos, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(todosActions.fetchTodosSuccess(
            todos.map((todo) => ({
                ...todo,
                message:   todo.todo,
                important: todo.favorites,
            }))
        ));
    } catch (error) {
        yield put(todosActions.fetchTodosFail(error.message));
    } finally {
        yield put(uiActions.stopTodosFetching());
    }
}

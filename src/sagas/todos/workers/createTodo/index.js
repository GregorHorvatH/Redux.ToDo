// Core
import { put, call } from 'redux-saga/effects';
// import { normalize } from 'normalizr';

// Instruments
import uiActions from '../../../../actions/ui';
import { api, token } from '../../../../instruments/api';
import todosActions from '../../../../actions/todos';
// import { post as postSchema } from '../../../../schemas';

export function* createTodoWorker ({ payload: todo }) {
    try {
        yield put(uiActions.startTodosFetching());

        const response = yield call(fetch, `${api}`, {
            method:  'POST',
            headers: {
                'Authorization': token,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify({ todo }),
        });

        const { data: newTodo, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(todosActions.createTodoSuccess({
            ...newTodo,
            message: newTodo.todo,
        }));
    } catch (error) {
        yield put(todosActions.createTodoFail(error.message));
    } finally {
        yield put(uiActions.stopTodosFetching());
    }
}

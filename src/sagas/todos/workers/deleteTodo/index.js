// Core
import { put, call } from 'redux-saga/effects';
// import { normalize } from 'normalizr';

// Instruments
import uiActions from '../../../../actions/ui';
import { api, token } from '../../../../instruments/api';
import todosActions from '../../../../actions/todos';
// import { post as postSchema } from '../../../../schemas';

export function* deleteTodoWorker ({ payload: todoId }) {
    try {
        yield put(uiActions.startTodosFetching());

        const response = yield call(fetch, `${api}/${todoId}`, {
            method:  'DELETE',
            headers: {
                'Authorization': token,
            },
        });

        if (response.status !== 204) {
            const { message } = yield call([response, response.json]);

            throw new Error(message);
        }

        yield put(todosActions.deleteTodoSuccess(todoId));
    } catch (error) {
        yield put(todosActions.deleteTodoFail(error.message));
    } finally {
        yield put(uiActions.stopTodosFetching());
    }
}

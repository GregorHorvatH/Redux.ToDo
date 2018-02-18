// Core
import { put, call } from 'redux-saga/effects';

// Instruments
import uiActions from '../../../../actions/ui';
import { api } from '../../../../instruments/api';
import { token } from '../../../../instruments/secret';
import todosActions from '../../../../actions/todos';

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

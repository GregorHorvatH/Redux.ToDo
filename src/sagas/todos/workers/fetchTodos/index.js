// Core
import { put, call } from 'redux-saga/effects';
import { normalize } from 'normalizr';

// Instruments
import uiActions from '../../../../actions/ui';
import { api } from '../../../../instruments/api';
import { token } from '../../../../instruments/secret';
import todosActions from '../../../../actions/todos';
import { todos as todosSchema } from '../../../../schemas';

export function* fetchTodosWorker ({ payload: options }) {
    try {
        yield put(uiActions.startTodosFetching());

        const { search } = options;

        const searchOption = search ? `?search=${search}` : '';

        const response = yield call(fetch, `${api}${searchOption}`, {
            method:  'GET',
            headers: {
                'Authorization': token,
            },
        });

        const { data: todos, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }
        const normalizedTodos = normalize(todos, todosSchema);

        yield put(todosActions.fetchTodosSuccess(normalizedTodos));
    } catch (error) {
        yield put(todosActions.fetchTodosFail(error.message));
    } finally {
        yield put(uiActions.stopTodosFetching());
    }
}

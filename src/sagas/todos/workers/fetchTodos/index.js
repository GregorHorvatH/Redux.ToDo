// Core
import { put, call } from 'redux-saga/effects';
// import { normalize } from 'normalizr';

// Instruments
import uiActions from '../../../../actions/ui';
import { api, token } from '../../../../instruments/api';
import todosActions from '../../../../actions/todos';
// import { post as postSchema } from '../../../../schemas';

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

        yield put(todosActions.fetchTodosSuccess(
            todos.map((todo) => ({
                ...todo,
                important: todo.favorite,
            }))
        ));
    } catch (error) {
        yield put(todosActions.fetchTodosFail(error.message));
    } finally {
        yield put(uiActions.stopTodosFetching());
    }
}

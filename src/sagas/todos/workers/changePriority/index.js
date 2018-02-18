// Core
import { put, call, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';

// Instruments
import uiActions from '../../../../actions/ui';
import { api } from '../../../../instruments/api';
import { token } from '../../../../instruments/secret';
import todosActions from '../../../../actions/todos';
import { todos as todosSchema } from '../../../../schemas';

export function* changePriorityWorker ({ payload: id }) {
    try {
        yield put(uiActions.startTodosFetching());

        const todos = yield select((store) => [
            store.todos.entities.get(id).toJS()
        ]);

        const response = yield call(fetch, `${api}`, {
            method:  'PUT',
            headers: {
                'Authorization': token,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify(
                todos.map((todo) => ({
                    ...todo,
                    favorite: !todo.favorite,
                }))
            ),
        });

        const { data: newTodos, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }
        const normalizedTodos = normalize(newTodos, todosSchema);

        yield put(todosActions.updateTodoSuccess(normalizedTodos));
    } catch (error) {
        yield put(todosActions.updateTodoFail(error.message));
    } finally {
        yield put(uiActions.stopTodosFetching());
    }
}

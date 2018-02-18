// Core
import { put, call, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';

// Instruments
import uiActions from '../../../../actions/ui';
import { api } from '../../../../instruments/api';
import { token } from '../../../../instruments/secret';
import todosActions from '../../../../actions/todos';
import { todos as todosSchema } from '../../../../schemas';

export function* completeAllWorker () {
    try {
        yield put(uiActions.startTodosFetching());

        const todos = yield select(
            (store) => store.todos.result.map(
                (item) => store.todos.entities.get(item).toJS()
            )
        );

        if (!todos.size) {
            throw new Error('Nothing to update');
        }

        const allCompleted = todos.every((todo) => todo.completed);

        const response = yield call(fetch, `${api}`, {
            method:  'PUT',
            headers: {
                'Authorization': token,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify(
                todos.map((todo) => ({
                    ...todo,
                    completed: !allCompleted,
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

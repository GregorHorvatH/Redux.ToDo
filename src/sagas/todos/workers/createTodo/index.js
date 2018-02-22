// Core
import { put, call } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { actions } from 'react-redux-form';

// Instruments
import uiActions from '../../../../actions/ui';
import { api } from '../../../../instruments/api';
import { token } from '../../../../instruments/secret';
import todosActions from '../../../../actions/todos';
import { todo as todoSchema } from '../../../../schemas';

export function* createTodoWorker ({ payload }) {
    try {
        yield put(uiActions.startTodosFetching());

        const response = yield call(fetch, `${api}`, {
            method:  'POST',
            headers: {
                'Authorization': token,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify({ message: payload }),
        });

        const { data: newTodo, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        const normalizedTodos = normalize({
            ...newTodo,
            important: false,
            completed: false,
        }, todoSchema);

        yield put(actions.change('forms.scheduler.todo', ''));

        yield put(todosActions.createTodoSuccess(normalizedTodos));
    } catch (error) {
        yield put(todosActions.createTodoFail(error.message));
    } finally {
        yield put(uiActions.stopTodosFetching());
    }
}

// Core
import { put, call, select } from 'redux-saga/effects';
// import { normalize } from 'normalizr';

// Instruments
import uiActions from '../../../../actions/ui';
import { api, token } from '../../../../instruments/api';
import todosActions from '../../../../actions/todos';
// import { post as postSchema } from '../../../../schemas';

export function* completeWorker ({ payload: id }) {
    try {
        yield put(uiActions.startTodosFetching());

        const todos = yield select(
            (store) => store.todos.filter(
                (todo) => todo.get('id') === id
            ).toJS()
        );

        const response = yield call(fetch, `${api}`, {
            method:  'PUT',
            headers: {
                'Authorization': token,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify(
                todos.map((todo) => ({
                    ...todo,
                    favorite:  todo.important,
                    completed: !todo.completed,
                }))
            ),
        });

        const { data: newTodos, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(todosActions.updateTodoSuccess(
            newTodos.map((todo) => ({
                ...todo,
                important: todo.favorite,
            }))
        ));
    } catch (error) {
        yield put(todosActions.updateTodoFail(error.message));
    } finally {
        yield put(uiActions.stopTodosFetching());
    }
}

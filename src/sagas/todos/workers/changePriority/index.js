// Core
import { put, call, select } from 'redux-saga/effects';
// import { normalize } from 'normalizr';

// Instruments
import uiActions from '../../../../actions/ui';
import { api, token } from '../../../../instruments/api';
import todosActions from '../../../../actions/todos';
// import { post as postSchema } from '../../../../schemas';

export function* changePriorityWorker ({ payload: id }) {
    try {
        yield put(uiActions.startTodosFetching());

        const todo = yield select(
            (store) => store.todos.filter(
                (item) => item.id === id
            )
        );

        const response = yield call(fetch, `${api}`, {
            method:  'PUT',
            headers: {
                'Authorization': token,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify([
                {
                    ...todo[0],
                    todo:      todo[0].message,
                    favorites: !todo[0].important,
                }
            ]),
        });

        const { data: newTodo, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(todosActions.updateTodoSuccess({
            ...newTodo[0],
            message:   newTodo[0].todo,
            important: newTodo[0].favorites,
        }));
    } catch (error) {
        yield put(todosActions.updateTodoFail(error.message));
    } finally {
        yield put(uiActions.stopTodosFetching());
    }
}

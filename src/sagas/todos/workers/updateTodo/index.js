// Core
// import { call, put, select } from 'redux-saga/effects';
// import { normalize } from 'normalizr';

// Instruments
// import todosActions from '../../../../actions/todos';
// import uiActions from '../../../../actions/ui';
// import { api } from '../../../../instruments/api';
// import { post as postSchema } from '../../../../schemas';

export function* updateTodoWorker ({ payload: todo }) {
    try {
        yield console.log('update todo', todo);
        // yield put(uiActions.startFeedFetching());

        // const token = yield select((state) => state.profile.token);

        // const response = yield call(fetch, `${api}/feed`, {
        //     method:  'POST',
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type':  'application/json',
        //     },
        //     body: JSON.stringify({ comment }),
        // });

        // const { data: denormalizedPost, message } = yield call([response, response.json]);

        // if (response.status !== 200) {
        //     if (response.status === 401) {
        //         localStorage.removeItem('token');
        //     }

        //     throw new Error(message);
        // }

        // const normalizedPosts = normalize(denormalizedPost, postSchema);

        // yield put(postsActions.createPostSuccess(normalizedPosts));
    } catch (error) {
        console.log('error', error);
        // yield put(postsActions.createPostFail(error.message));
    } finally {
        console.log('finally');
        // yield put(uiActions.stopFeedFetching());
    }
}

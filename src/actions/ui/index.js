import types from './types';

export default Object.freeze({
    startTodosFetching: () => ({
        type: types.START_TODOS_FETCHING,
    }),
    stopTodosFetching: () => ({
        type: types.STOP_TODOS_FETCHING,
    }),
});

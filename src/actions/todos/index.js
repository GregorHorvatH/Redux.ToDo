// Core
import types from './types';

export default Object.freeze({
    fillTodos: (user) => ({
        type:    types.FILL_TODOS,
        payload: user,
    }),
    clearTodos: () => ({
        type: types.CLEAR_TODOS,
    }),

    fetchTodos: (options) => ({
        type:    types.FETCH_TODOS,
        payload: options,
    }),
    fetchTodosSuccess: (todos) => ({
        type:    types.FETCH_TODOS_SUCCESS,
        payload: todos,
    }),
    fetchTodosFail: (error) => ({
        type:    types.FETCH_TODOS_FAIL,
        payload: error,
        error:   true,
    }),

    createTodo: (todo) => ({
        type:    types.CREATE_TODO,
        payload: todo,
    }),
    createTodoSuccess: (todo) => ({
        type:    types.CREATE_TODO_SUCCESS,
        payload: todo,
    }),
    createTodoFail: (error) => ({
        type:    types.CREATE_TODO_FAIL,
        payload: error,
        error:   true,
    }),

    changePriority: (id) => ({
        type:    types.CHANGE_PRIORITY,
        payload: id,
    }),

    updateTodo: (todo) => ({
        type:    types.UPDATE_TODO,
        payload: todo,
    }),
    updateTodoSuccess: (todo) => ({
        type:    types.UPDATE_TODO_SUCCESS,
        payload: todo,
    }),
    updateTodoFail: (error) => ({
        type:    types.UPDATE_TODO_FAIL,
        payload: error,
        error:   true,
    }),

    deleteTodo: (id) => ({
        type:    types.DELETE_TODO,
        payload: id,
    }),
    deleteTodoSuccess: (id) => ({
        type:    types.DELETE_TODO_SUCCESS,
        payload: id,
    }),
    deleteTodoFail: (error) => ({
        type:    types.DELETE_TODO_FAIL,
        payload: error,
        error:   true,
    }),
});

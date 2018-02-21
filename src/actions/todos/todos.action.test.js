// Instruments
import todos from './';

const options = {
    id:        '5a86ad9aea1a7600011d395a',
    message:   'Test message',
    completed: true,
    favorite:  false,
    created:  '2018-02-16T10:08:26.462Z',
    modified: '2018-02-16T10:09:04.798Z',
};

const id = '5a86ad9aea1a7600011d395a';

const error = new Error();

describe('Todos actions', () => {
    test('fetchTodos action', () => {
        expect(todos.fetchTodos(options)).toEqual({
            type:    'FETCH_TODOS',
            payload: options,
        });
    });
    test('fetchTodosSuccess action', () => {
        expect(todos.fetchTodosSuccess(options)).toEqual({
            type:    'FETCH_TODOS_SUCCESS',
            payload: options,
        });
    });
    test('fetchTodosFail action', () => {
        expect(todos.fetchTodosFail(error)).toEqual({
            type:    'FETCH_TODOS_FAIL',
            payload: error,
            error:   true,
        });
    });

    test('createTodo action', () => {
        expect(todos.createTodo(options)).toEqual({
            type:    'CREATE_TODO',
            payload: options,
        });
    });
    test('createTodoSuccess action', () => {
        expect(todos.createTodoSuccess(options)).toEqual({
            type:    'CREATE_TODO_SUCCESS',
            payload: options,
        });
    });
    test('createTodoFail action', () => {
        expect(todos.createTodoFail(error)).toEqual({
            type:    'CREATE_TODO_FAIL',
            payload: error,
            error:   true,
        });
    });

    test('changePriority action', () => {
        expect(todos.changePriority(id)).toEqual({
            type:    'CHANGE_PRIORITY',
            payload: id,
        });
    });

    test('complete action', () => {
        expect(todos.complete(id)).toEqual({
            type:    'COMPLETE',
            payload: id,
        });
    });

    test('completeAll action', () => {
        expect(todos.completeAll()).toEqual({
            type: 'COMPLETE_ALL',
        });
    });

    test('updateTodo action', () => {
        expect(todos.updateTodo(options)).toEqual({
            type:    'UPDATE_TODO',
            payload: options,
        });
    });
    test('updateTodoSuccess action', () => {
        expect(todos.updateTodoSuccess(options)).toEqual({
            type:    'UPDATE_TODO_SUCCESS',
            payload: options,
        });
    });
    test('updateTodoFail action', () => {
        expect(todos.updateTodoFail(error)).toEqual({
            type:    'UPDATE_TODO_FAIL',
            payload: error,
            error:   true,
        });
    });

    test('deleteTodo action', () => {
        expect(todos.deleteTodo(id)).toEqual({
            type:    'DELETE_TODO',
            payload: id,
        });
    });
    test('deleteTodoSuccess action', () => {
        expect(todos.deleteTodoSuccess(id)).toEqual({
            type:    'DELETE_TODO_SUCCESS',
            payload: id,
        });
    });
    test('deleteTodoFail action', () => {
        expect(todos.deleteTodoFail(error)).toEqual({
            type:    'DELETE_TODO_FAIL',
            payload: error,
            error:   true,
        });
    });
});

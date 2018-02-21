// Core
import { Map, List, fromJS } from 'immutable';
import { createStore } from 'redux';

// Instruments
import entities from './entities.js';
import result from './result.js';
import reducers from './';

// ROOT REDUCER
const store = createStore(reducers);

describe('Root reducer test', () => {
    test('create store test', () => {
        expect(store.getState().entities).toEqual(entities(undefined, {}));
        expect(store.getState().result).toEqual(result(undefined, {}));
    });
});

const entitiesInitialState = Map({});
const resultInitialState = List([]);


// ENTITIES
const todo = {
    '5a8d83d0894aa60001658a5a': {
        'id': '5a8d83d0894aa60001658a5a',
        'message': '2',
        'completed': false,
        'favorite': false,
        'created': '2018-02-21T14:36:00.965Z',
        'modified': '2018-02-21T14:37:48.893Z'
    }
};

const updatedTodo = {
    '5a8d83d0894aa60001658a5a': {
        'id': '5a8d83d0894aa60001658a5a',
        'message': '2345',
        'completed': true,
        'favorite': true,
        'created': '2018-02-21T14:36:00.965Z',
        'modified': '2018-02-21T14:37:48.893Z'
    }
};

const todos = {
    '5a8d83d0894aa60001658a5a': {
        'id': '5a8d83d0894aa60001658a5a',
        'message': '2',
        'completed': false,
        'favorite': false,
        'created': '2018-02-21T14:36:00.965Z',
        'modified': '2018-02-21T14:37:48.893Z'
    },
    '5a8d83d0894aa60001658a59': {
        'id': '5a8d83d0894aa60001658a59',
        'message': '1',
        'completed': false,
        'favorite': true,
        'created': '2018-02-21T14:36:00.625Z',
        'modified': '2018-02-21T14:37:19.413Z'
    }
};
const updatedTodos = {
    '5a8d83d0894aa60001658a5a': {
        'id': '5a8d83d0894aa60001658a5a',
        'message': '2345',
        'completed': true,
        'favorite': true,
        'created': '2018-02-21T14:36:00.965Z',
        'modified': '2018-02-21T14:37:48.893Z'
    },
    '5a8d83d0894aa60001658a59': {
        'id': '5a8d83d0894aa60001658a59',
        'message': '1',
        'completed': false,
        'favorite': true,
        'created': '2018-02-21T14:36:00.625Z',
        'modified': '2018-02-21T14:37:19.413Z'
    }
};

const id = '5a8d83d0894aa60001658a59';

const changedEntitiesState = fromJS(todos);

describe('Todos ENTITIES reducer', () => {
    test('Initial state test', () => {
        expect(entities(undefined, {})).toEqual(entitiesInitialState);
    });

    test('FETCH_TODOS_SUCCESS test', () => {
        expect(entities(entitiesInitialState, {
            type:    'FETCH_TODOS_SUCCESS',
            payload: {
                entities: {
                    todo: todos,
                },
            },
        })).toEqual(changedEntitiesState);
    });

    test('CREATE_TODO_SUCCESS test', () => {
        expect(entities(entitiesInitialState, {
            type:    'CREATE_TODO_SUCCESS',
            payload: {
                entities: {
                    todo: todos,
                },
            },
        })).toEqual(changedEntitiesState);
    });

    test('DELETE_TODO_SUCCESS test', () => {
        expect(entities(changedEntitiesState, {
            type:    'DELETE_TODO_SUCCESS',
            payload: id,
        })).toEqual(fromJS(todo));
    });

    test('UPDATE_TODO_SUCCESS test', () => {
        expect(entities(changedEntitiesState, {
            type:    'UPDATE_TODO_SUCCESS',
            payload: {
                entities: {
                    todo: updatedTodo,
                },
            },
        })).toEqual(fromJS(updatedTodos));
    });
});


//RESULT
const resultItem = '5a8d83d0894aa60001658a5a';

const resultArr = ['5a8d83d0894aa60001658a5a', '5a8d83d0894aa60001658a59'];
const resultArr2 = ['5a8d83d0894aa60001658a59'];

const changedResultState = fromJS(resultArr);

describe('Todos RESULT reducer', () => {
    test('Initial state test', () => {
        expect(result(undefined, {})).toEqual(resultInitialState);
    });

    test('FETCH_TODOS_SUCCESS test', () => {
        expect(result(resultInitialState, {
            type:    'FETCH_TODOS_SUCCESS',
            payload: {
                result: resultArr,
            },
        })).toEqual(changedResultState);
    });

    test('CREATE_TODO_SUCCESS test', () => {
        expect(result(resultInitialState, {
            type:    'CREATE_TODO_SUCCESS',
            payload: {
                result: resultItem,
            },
        })).toEqual(List([resultItem]));
    });

    test('DELETE_TODO_SUCCESS test', () => {
        expect(result(changedResultState, {
            type:    'DELETE_TODO_SUCCESS',
            payload: resultItem,
        })).toEqual(List(resultArr2));
    });
});

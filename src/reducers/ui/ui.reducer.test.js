// Core
import { Map } from 'immutable';
import reducer from './';

const initialState = Map({
    todoFetching: false,
});

const changedState = Map({
    todoFetching: true,
});

describe('UI reducer', () => {
    test('Initial state test', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    test('START_TODOS_FETCHING test', () => {
        expect(reducer(initialState, { type: 'START_TODOS_FETCHING' })).toEqual(changedState);
    });

    test('STOP_TODOS_FETCHING test', () => {
        expect(reducer(initialState, { type: 'STOP_TODOS_FETCHING' })).toEqual(initialState);
    });
});

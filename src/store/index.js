// Core
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

// Instruments
import reducer from '../reducers';
import { saga } from '../sagas';
import types from '../actions/todos/types';
import {
    loadState,
    saveState,
    sortFavoritesFirst,
    sortCompleteLast
} from '../helpers';

// Environment check
const dev = process.env.NODE_ENV === 'development'; // eslint-disable-line
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = dev && devtools ? devtools : compose;

// const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// This is a middleware
const logger = createLogger({
    duration:  true,
    collapsed: true,
    diff:      true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005',
    },
});

const { entities, result } = loadState();
const persistedStore = {
    entities: fromJS(entities),
    result:   fromJS(result),
};

if (dev) {
    middleware.push(logger);
}

const store = createStore(
    reducer,
    { todos: persistedStore },
    composeEnhancers(applyMiddleware(...middleware))
);

store.subscribe(() => {
    const todos = store.getState().todos;

    saveState(todos);
});

store.subscribe(() => {
    const state = store.getState();
    const { lastAction, todos } = state;
    const actionTypes = [
        types.FETCH_TODOS_SUCCESS,
        types.UPDATE_TODO_SUCCESS,
        types.CREATE_TODO_SUCCESS
    ];

    if (actionTypes.indexOf(lastAction.type) > -1) {
        const sortedResult = todos.result.map(
            (item) => todos.entities.get(item)
        )
            .sort(sortFavoritesFirst)
            .sort(sortCompleteLast)
            .map((item) => item.get('id'));

        todos.result = sortedResult;
    }
});

export { history };
export default store;

sagaMiddleware.run(saga);

window.x = store;

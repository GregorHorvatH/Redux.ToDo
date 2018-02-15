// Core
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

// Instruments
import reducer from '../reducers';
import { saga } from '../sagas';
import { loadState } from '../helpers';

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

const persistedState = fromJS(loadState());

if (dev) {
    middleware.push(logger);
}

export { history };
export default createStore(
    reducer,
    { todos: persistedState },
    composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(saga);

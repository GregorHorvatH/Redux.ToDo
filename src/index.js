// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Instruments
import './theme/reset.css';
import store from './store';
import { saveState } from './helpers';

// App
import App from './containers/App';

store.subscribe(() => {
    saveState({
        todos: store.getState().todos,
    });
});

render(
    <Provider store = { store }>
        <App />
    </Provider>,
    document.getElementById('root')
);

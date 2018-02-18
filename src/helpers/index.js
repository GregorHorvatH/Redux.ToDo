const initialState = {
    entities: [],
    result:   [],
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('todos');

        if (serializedState === null) {
            return initialState;
        }

        return JSON.parse(serializedState);
    } catch (error) {
        return initialState;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);

        localStorage.setItem('todos', serializedState);
    } catch (error) {
        // Ignore write errors
    }
};

export const sortFavoritesFirst = (todo1, todo2) => {
    if (todo1.get('favorite') && !todo2.get('favorite')) {
        return -1;
    }

    if (!todo1.get('favorite') && todo2.get('favorite')) {
        return 1;
    }

    return 0;
};

export const sortCompleteLast = (todo1, todo2) => {
    if (todo1.get('completed') && !todo2.get('completed')) {
        return 1;
    }

    if (!todo1.get('completed') && todo2.get('completed')) {
        return -1;
    }

    return 0;
};

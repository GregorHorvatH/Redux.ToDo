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

// Core
import { createSelector } from 'reselect';

const todoIds = (state) => state.todos.result;
const todoEntities = (state) => state.todos.entities;

export const getTodos = createSelector(
    todoIds,
    todoEntities,
    (_todoIds, _todoEntities) => _todoIds.map(
        (id) => {
            const todo = _todoEntities.get(id);

            return {
                id:        todo.get('id'),
                message:   todo.get('message'),
                completed: todo.get('completed'),
                important: todo.get('favorite'),
            };
        }
    )
        .toJS(),
);

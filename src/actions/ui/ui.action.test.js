// Instruments
import ui from './';

describe('UI actions', () => {
    test('startTodosFetching action', () => {
        expect(ui.startTodosFetching()).toEqual({
            type: 'START_TODOS_FETCHING',
        });
    });
    test('stopTodosFetching action', () => {
        expect(ui.stopTodosFetching()).toEqual({
            type: 'STOP_TODOS_FETCHING',
        });
    });
});

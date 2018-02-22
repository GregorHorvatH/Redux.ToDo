// Core
import { toast, style } from 'react-toastify';

// Instruments
import types from '../../actions/todos/types';

style({
    BOTTOM_RIGHT: {
        bottom:    '1em',
        right:     '1em',
        textAlign: 'center',
        fontSize:  '1.5em',
    },
});

export const notify = () => (next) => (action) => {
    let message = '';

    if (action.error) {
        toast.error(action.payload, {
            position:  toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
        });
    }

    if (action.type.indexOf('_SUCCESS') > -1) {
        switch (action.type) {
            case types.CREATE_TODO_SUCCESS:
                message = 'Create done!';
                break;
            case types.DELETE_TODO_SUCCESS:
                message = 'Delete done!';
                break;
            case types.UPDATE_TODO_SUCCESS:
                message = 'Upate done!';
                break;
            default:
                break;
        }

        if (message) {
            toast.success(message, {
                position:  toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
            });
        }
    }

    next(action);
};

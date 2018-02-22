// Core
import { toast, style } from 'react-toastify';

style({
    BOTTOM_RIGHT: {
        bottom:    '1em',
        right:     '1em',
        textAlign: 'center',
        fontSize:  '1.5em',
    },
});

export const notify = () => (next) => (action) => {
    if (action.error) {
        toast.error(action.payload, {
            position:  toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
        });
    }

    if (action.type.indexOf('_SUCCESS') > -1) {
        toast.success(`${action.type} - Done`, {
            position:  toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
        });
    }

    next(action);
};

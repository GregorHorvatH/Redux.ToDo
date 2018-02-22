// Core
import { combineForms } from 'react-redux-form';

export default combineForms(
    {
        scheduler: {
            search: '',
            todo:   '',
        },
    },
    'forms',
);

// Core
import React, { Component } from 'react';
import { func } from 'prop-types';
import { Form, Errors, Control } from 'react-redux-form';

// Instruments
// import Styles from './styles';
// import { validateEmail, validateLength } from 'instruments/validators';

// Components
// import Input from 'components/Input';

export default class LoginForm extends Component {
    static propTypes = {
        onSubmit: func.isRequired,
    };

    _handleSubmit = (todo) => {
        this.props.onSubmit(todo);
    }

    render () {
        return (
            <Form
                // className = { Styles.form }
                model = 'forms.scheduler'
                onSubmit = { this._handleSubmit }>
                <Errors
                    messages = { {
                        valid: 'todo can`t be empty',
                    } }
                    model = 'forms.scheduler.todo'
                    show = { ({ submitFailed, touched, errors }) =>
                        submitFailed || touched && errors.valid }
                />
                <Control
                    // disabled = { authFetching }
                    // disabledstyle = { disabledInputStyle }
                    // errors = { {
                    //     valid: (email) => !validateEmail(email),
                    // } }
                    // errorstyle = { Styles.error }
                    id = 'forms.scheduler.todo'
                    model = 'forms.scheduler.todo'
                    placeholder = 'Описание моей новой задачи'
                />
                {/* <label>
                    <Control.checkbox
                        id = 'forms.login.remember'
                        model = 'forms.login.remember'
                        type = 'checkbox'
                    />
                    Remember me?
                </label> */}
                <button
                    // className = { buttonStyle }
                    // disabled = { authFetching }
                    type = 'submit'>
                    Добавить задачу
                </button>
            </Form>
        );
    }
}

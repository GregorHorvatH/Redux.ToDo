// Core
import React, { Component } from 'react';
import { func } from 'prop-types';
import { Form, Control } from 'react-redux-form';

export default class NewTodo extends Component {
    static propTypes = {
        onSubmit: func.isRequired,
    };

    _handleSubmit = (todo) => {
        this.props.onSubmit(todo);
    }

    render () {
        return (
            <Form
                model = 'forms.scheduler'
                onSubmit = { this._handleSubmit }>
                <Control
                    id = 'forms.scheduler.todo'
                    model = 'forms.scheduler.todo'
                    placeholder = 'Описание моей новой задачи'
                />
                <button
                    type = 'submit'>
                    Добавить задачу
                </button>
            </Form>
        );
    }
}

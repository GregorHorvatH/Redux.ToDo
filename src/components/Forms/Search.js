// Core
import React, { Component } from 'react';
import { func } from 'prop-types';
import { Form, Control } from 'react-redux-form';

export default class Search extends Component {
    static propTypes = {
        onSubmit: func.isRequired,
    };

    _handleSubmit = (search) => {
        this.props.onSubmit(search);
    }

    render () {
        return (
            <Form
                model = 'forms.scheduler'
                onSubmit = { this._handleSubmit }>
                <Control
                    id = 'forms.scheduler.search'
                    model = 'forms.scheduler.search'
                    placeholder = 'Поиск'
                />
            </Form>
        );
    }
}

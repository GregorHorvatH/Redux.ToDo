// Core
import React, { Component } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles';
import Checkbox from '../../theme/assets/Checkbox';
import Delete from '../../theme/assets/Delete';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

export default class Task extends Component {

    constructor (props) {
        super(props);

        this.state = {
            isEditing: false,
            newTodo:   props.message,
        };
    }

    _complete = () => {
        const { id, complete } = this.props;

        complete(id);
    }

    _changePriority = () => {
        const { id, changePriority } = this.props;

        changePriority(id);
    }

    _handleEditClick = () => {
        const { isEditing, newTodo } = this.state;
        const { id, updateTodo } = this.props;
        const pos = newTodo.length || 0;

        if (!isEditing) {
            // workaround для работы фокуса и изменения
            // позиции курсора в разных браузерах
            setTimeout(() => {
                this.input.focus();
                this.input.setSelectionRange(pos, pos);
            }, 50);
        } else {
            updateTodo({
                id,
                message: newTodo,
            });
        }

        this.setState({ isEditing: !isEditing });
    }

    _handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            this._handleEditClick();
        }
    }

    _handleInputChange = (event) => {
        const newTodo = event.target.value || '';

        this.setState({ newTodo });
    }

    _handleDeleteClick = () => {
        const { id, deleteTodo } = this.props;

        deleteTodo(id);
    }

    render () {
        const { completed, important } = this.props;
        const { isEditing, newTodo } = this.state;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.inputWrapper }>
                    <Checkbox
                        checked = { completed }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._complete }
                    />

                    <input
                        className = { Styles.input }
                        disabled = { !isEditing }
                        ref = { (ref) => this.input = ref }
                        type = 'text'
                        value = { newTodo }
                        onChange = { this._handleInputChange }
                        onKeyPress = { this._handleInputKeyPress }
                    />
                </div>
                <div>
                    <Star
                        checked = { important }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._changePriority }
                    />
                    <Edit
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._handleEditClick }
                    />
                    <Delete
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._handleDeleteClick }
                    />
                </div>
            </li>
        );
    }
}
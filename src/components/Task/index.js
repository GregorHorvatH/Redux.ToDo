// Core
import React, { Component } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles';
import Checkbox from 'theme/assets/Checkbox';
import Delete from 'theme/assets/Delete';
import Edit from 'theme/assets/Edit';
import Star from 'theme/assets/Star';

export default class Task extends Component {
    _complete = () => {
        const { id, complete } = this.props;

        complete(id);
    }

    _changePriority = () => {
        const { id, changePriority } = this.props;

        changePriority(id);
    }

    _handleEditClick = () => {

    }

    _handleDeleteClick = () => {
        const { id, deleteTodo } = this.props;

        deleteTodo(id);
    }

    render () {
        const { completed, important, message } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div>
                    <Checkbox
                        checked = { completed }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._complete }
                    />
                    <code>{message}</code>
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

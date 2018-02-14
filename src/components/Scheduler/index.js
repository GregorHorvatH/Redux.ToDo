// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles';
import Checkbox from 'theme/assets/Checkbox';
import todosActions from '../../actions/todos';

// Components
import Task from '../../components/Task';

class Scheduler extends Component {

    componentDidMount () {
        const { fetchTodos } = this.props.actions;

        fetchTodos();
        this.input.focus();
    }

    _handleSubmit = (event) => {
        const { createTodo } = this.props.actions;

        event.preventDefault();
        createTodo(this.input.value);
        this.input.value = '';
    }

    _complete = (id) => {
        console.log('complete', id);
        // this.setState(({ todos }) => ({
        //     todos: todos.map((todo) => {
        //         if (todo.id === id) {
        //             todo.completed = !todo.completed;
        //         }

        //         return todo;
        //     }),
        // }));
    }

    _changePriority = (id) => {
        const { changePriority } = this.props.actions;

        changePriority(id);
    }

    _completeAll = () => {
        console.log('complete all');
        // this.setState(({ todos }) => ({
        //     todso: todos.map((todo) => {
        //         todo.completed = true;

        //         return todo;
        //     }),
        // }));
    };

    render () {
        const { todos } = this.props;
        const { deleteTodo } = this.props.actions;
        const allCompleted = todos.every((todo) => todo.completed);
        const todoList = todos.map(({ id, message, completed, important }) => (
            <Task
                changePriority = { this._changePriority }
                complete = { this._complete }
                completed = { completed }
                deleteTodo = { deleteTodo }
                id = { id }
                important = { important }
                key = { id }
                message = { message }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>
                    <section>
                        <form onSubmit = { this._handleSubmit }>
                            <input
                                placeholder = 'Описание моей новой задачи'
                                ref = { (ref) => this.input = ref }
                                type = 'text'
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <ul>{todoList}</ul>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { allCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAll }
                        />
                        <code>Все задачи выполнены</code>
                    </footer>
                </main>
            </section>
        );
    }
}

const mapStateToProps = ({ todos }) => ({
    todos,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...todosActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);

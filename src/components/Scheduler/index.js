// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles';
import Checkbox from 'theme/assets/Checkbox';
import todosActions from '../../actions/todos';
import { todoMaxLength } from '../../instruments/config';

// Components
import Task from '../Task';
import Spinner from '../Spinner';

// Selectors
import { getTodos } from '../../selectors/todos';

class Scheduler extends Component {

    constructor (props) {
        super(props);

        this.state = {
            newTodo: '',
            search:  '',
        };

        window.onresize = () => {
            this._setMainTopPosition();
        };
    }

    componentDidMount () {
        const { fetchTodos } = this.props.actions;
        const { search } = this.state;

        this._setMainTopPosition();
        fetchTodos({ search });
        this.input.focus();
    }

    // фикс изображения компонента на маленьком экране
    _setMainTopPosition = () => {
        if (window.innerHeight < this.main.offsetHeight) {
            this.main.className = Styles.fixed;
        } else {
            this.main.classList.remove(Styles.fixed);
        }
    }

    _handleInputChange = (event) => {
        const newTodo = event.target.value || '';

        if (newTodo.length <= todoMaxLength) {
            this.setState({ newTodo });
        }
    }

    _handleSubmit = (event) => {
        event.preventDefault();

        const { createTodo } = this.props.actions;
        const { newTodo } = this.state;

        if (newTodo.trim()) {
            createTodo(newTodo);
            this.setState({ newTodo: '' });
        }
    }

    _complete = (id) => {
        const { complete } = this.props.actions;

        complete(id);
    }

    _changePriority = (id) => {
        const { changePriority } = this.props.actions;

        changePriority(id);
    }

    _completeAll = () => {
        const { completeAll } = this.props.actions;

        completeAll();
    }

    _handleSearchInputChange = (event) => {
        const search = event.target.value || '';

        this.setState({ search });
    }

    _handleSearchInputKeyPress = (event) => {
        const { search } = this.state;
        const { fetchTodos } = this.props.actions;

        if (event.key === 'Enter') {
            fetchTodos({ search });
        }
    }

    render () {
        const { search, newTodo } = this.state;
        const { todos } = this.props;
        const todoFetching = this.props.ui.get('todoFetching');
        const { deleteTodo, updateTodo } = this.props.actions;
        const allCompleted = todos.every((todo) => todo.completed);
        const todoList = todos.filter((todo) => todo.message.indexOf(search) > -1)
            .map((todo) => {
                const { id, message, completed, important } = todo;

                return (
                    <Task
                        changePriority = { this._changePriority }
                        complete = { this._complete }
                        completed = { completed }
                        deleteTodo = { deleteTodo }
                        id = { id }
                        important = { important }
                        key = { id }
                        message = { message }
                        updateTodo = { updateTodo }
                    />
                );
            });

        return (
            <section className = { Styles.scheduler }>
                <Spinner spin = { todoFetching } />
                <main ref = { (ref) => this.main = ref }>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { search }
                            onChange = { this._handleSearchInputChange }
                            onKeyPress = { this._handleSearchInputKeyPress }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._handleSubmit }>
                            <input
                                placeholder = 'Описание моей новой задачи'
                                ref = { (ref) => this.input = ref }
                                type = 'text'
                                value = { newTodo }
                                onChange = { this._handleInputChange }
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

const mapStateToProps = (state) => ({
    todos: getTodos(state),
    ui:    state.ui,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...todosActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);

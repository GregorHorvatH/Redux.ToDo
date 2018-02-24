// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlipMove from 'react-flip-move';

// Instruments
import Styles from './styles';
import Checkbox from 'theme/assets/Checkbox';
import todosActions from '../../actions/todos';

// Components
import Task from '../Task';
import Spinner from '../Spinner';
import { ToastContainer } from 'react-toastify';
import NewTodoForm from '../Forms/NewTodo';
import SearchForm from '../Forms/Search';

// Selectors
import { getTodos } from '../../selectors/todos';

class Scheduler extends Component {

    constructor (props) {
        super(props);

        window.onresize = () => {
            this._setMainTopPosition();
        };
    }

    componentDidMount () {
        const { fetchTodos } = this.props.actions;
        const { search } = this.props.forms.scheduler;

        this._setMainTopPosition();
        fetchTodos({ search });
    }

    // фикс изображения компонента на маленьком экране
    _setMainTopPosition = () => {
        if (window.innerHeight < this.main.offsetHeight) {
            this.main.className = Styles.fixed;
        } else {
            this.main.classList.remove(Styles.fixed);
        }
    }

    _handleNewTodoSubmit = ({ todo }) => {
        const { createTodo } = this.props.actions;

        if (todo.trim()) {
            createTodo(todo);
        }
    }

    _handleSearchSubmit = ({ search }) => {
        const { fetchTodos } = this.props.actions;

        fetchTodos({ search });
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

    render () {
        const { todos, forms } = this.props;
        const { search } = forms.scheduler;
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

        const ui = this.props.ui;
        const todoFetching = ui.get('todoFetching');

        return (
            <section className = { Styles.scheduler }>
                <ToastContainer />
                <Spinner spin = { todoFetching } />
                <main ref = { (ref) => this.main = ref }>
                    <header>
                        <h1>Планировщик задач</h1>
                        <SearchForm onSubmit = { this._handleSearchSubmit } />
                    </header>
                    <section>
                        <NewTodoForm onSubmit = { this._handleNewTodoSubmit } />
                        <ul>
                            <FlipMove duration = { 300 } easing = 'ease-out'>
                                {todoList}
                            </FlipMove>
                        </ul>
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
    forms: state.forms,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...todosActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);

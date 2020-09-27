import { connect } from 'react-redux';
import React from 'react';
import Todo from './Todo.jsx';
import { saveTodo, deleteTodo } from '../actions/index.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle  from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText  from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const todoListStyle = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
};

const listOuter = {
};

const filterTodos = (todos, filter) => {
    if(filter == 'SHOW_COMPLETED') {
        return todos.filter((item) => {
            return item.completed == true;
        });
    } else if (filter == 'SHOW_PENDING') {
        return todos.filter((item) => {
            return item.completed == false;
        });
    } else {
        return todos;
    }
};

class TodoListComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            rename: false,
            delete: false,
            todo: null
        };
        this.renameRef = React.createRef();
    }

    onCompletedChanged(ptodo, completed) {
        let todo = Object.assign({}, ptodo);
        todo.completed = !todo.completed;
        this.props.saveTodo(todo);
    }

    onRenameTodo(todo) {
        this.setState({rename: true, todo: todo});
    }

    onDeleteTodo(todo) {
        this.setState({delete: true, todo: todo});
    }

    onHandleClose() {
        this.setState({rename: false, delete: false, todo: null});
    }

    onOk() {
        let todo = Object.assign({}, this.state.todo);

        if(this.state.rename) {
            todo.text = this.renameRef.current.value;
            this.props.saveTodo(todo);
        } else if (this.state.delete) {
            this.props.deleteTodo(todo);
        }
        this.onHandleClose();
        console.log(todo);
    }

    render() {
        if(this.props.fetching) {
            return (
                <CircularProgress />
            );
        }
        let todos = filterTodos(this.props.todos, this.props.filter);

        let todosComponents = todos.map((item, index) => {
            const onRename = () => {
                return this.onRenameTodo(item);
            };
            const onDelete = () => {
                return this.onDeleteTodo(item);
            };
            return <Todo key={item._id} todo={item} 
                onCompletedChanged={this.onCompletedChanged.bind(this)}
                onRename={onRename}
                onDelete={onDelete}/>
        });
        
        return (
            <div className="demo-list-icon todo-list mdl-shadow--2dp" style={todoListStyle}>
                {todosComponents}

                <Dialog open={this.state.delete}>
                    <DialogTitle id="delete-dialog-title">Delete Todo Item ?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-dialog-content">
                            Are you sure you want to delete todo item "{this.state.todo && this.state.todo.text}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onOk.bind(this)} color="primary">Yes</Button>
                        <Button onClick={this.onHandleClose.bind(this)} color="primary" autoFocus>No</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.rename}>
                    <DialogTitle id="rename-dialog-title">Rename Todo Item ?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="rename-dialog-content">
                            Please enter new text for Todo "{this.state.todo && this.state.todo.text}"?
                        </DialogContentText>
                        <TextField autoFocus margin="dense" id="newText" label="Rename Todo" type="text" fullWidth inputRef={this.renameRef}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onOk.bind(this)} color="primary">Yes</Button>
                        <Button onClick={this.onHandleClose.bind(this)} color="primary">No</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todoApp.todos,
        fetching: state.todoApp.fetching,
        filter: state.todoApp.filter,
        completeState: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveTodo: (todo) => dispatch(saveTodo(todo)),
        deleteTodo: (todo) => dispatch(deleteTodo(todo))
    };
};

const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListComponent);

export default TodoList;



import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {addTodos} from '../actions/index.jsx';

const newTodoStyle = {
    padding: '10px 0px',
    display: 'flex',
    flexDirection: 'row'
};

const buttonContainer = {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto'
};

const inputStyle = {
    marginRight: '10px',
    flex: 1
};

const buttonStyle = {
    marginBottom: '10px'
};

class NewTodoComponent extends React.Component {
    constructor() {
        super();
        this.textInput = React.createRef();
    }

    handleAddTodo() {
        let text = this.textInput.current.value;

        if(text != '') {
            this.props.addTodos(this.textInput.current.value);
            this.textInput.current.value = '';
        }
    }

    render() {
        return (
            <div className="newTodo" style={newTodoStyle}>
                <TextField style={inputStyle} id="newTodoText" label="New Todo" inputRef={this.textInput}/>
                <div className="newTodo-actions" style={buttonContainer}>
                    <Button color="primary" onClick={this.handleAddTodo.bind(this)}>Add Todo</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodos: (text) => dispatch(addTodos(text))
    };
};

const NewTodo = connect(mapStateToProps, mapDispatchToProps)(NewTodoComponent);
export default NewTodo;

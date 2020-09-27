import { combineReducers } from 'redux';

const defaultTodoState = {
    todos: [],
    fetching: true,
    filter: 'SHOW_ALL'
};

const todoReducer = (state = {todos:[], fetching: true}, action) => {
    let newState = Object.assign({}, defaultTodoState, state);

    console.log(action);

    switch(action.type) {
        case 'PRE_FETCH':
            newState.fetching = true;
            break;
        case 'POST_FETCH':
            newState.fetching = false;
            newState.todos = action.todos;
            break;
        case 'ERROR_FETCH':
            newState.fetching = false;
            break;
        case 'FILTER_TODO':
            newState.filter = action.filter;
        default:
            break;
    }

    return newState;
};

const allReducers = combineReducers({
    todoApp: todoReducer
});


export default allReducers;

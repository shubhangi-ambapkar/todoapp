import Axios from 'axios';

const TODO_BASE_URL = 'http://localhost:5000/api/todo';

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch({ type: 'PRE_FETCH' });
        return Axios.get(TODO_BASE_URL).then((todos) => {
            return dispatch({ type: 'POST_FETCH', todos: todos.data });
        }).catch((err) => {
            return dispatch({ type: 'ERR_FETCH', err});
        });
    };
};

export const addTodos = (text) => {
    let todo = {text: text, completed: false};

    return (dispatch) => {
        dispatch({ type: 'PRE_ADD_TODO' });
        return Axios.post(TODO_BASE_URL, todo).then(() => {
            return dispatch(fetchTodos());
        }).catch((err) => {
            return dispatch({type: 'ERR_ADD_TODO', err});
        });
    };
};

export const saveTodo = (todo) => {
    console.log('Saving todo', todo);
    return (dispatch) => {
        dispatch({type: 'PRE_SET_COMPLETED'});
        return Axios.post(TODO_BASE_URL + '/' + todo._id, todo).then(() => {
            return dispatch(fetchTodos());
        });
    };
};

export const filterTodo = (filter) => {
    return {
        type: 'FILTER_TODO',
        filter: filter
    };
};

export const deleteTodo = (todo) => {
    return (dispatch) => {
        return Axios.delete(TODO_BASE_URL + '/' + todo._id).then(() => {
            return dispatch(fetchTodos());
        });
    };
};

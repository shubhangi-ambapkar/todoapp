import React from 'react';
import ReactDom from 'react-dom';

import Title from './components/Title.jsx';
import Action from './components/Action.jsx';
import NewTodo from './components/NewTodo.jsx';
import TodoList from './components/TodoList.jsx';

import {createStore, applyMiddleware} from 'redux';
import {Provider, useDispatch} from 'react-redux';
import reducers from './reducers/index.jsx';
import ReduxThunk from 'redux-thunk';
import {fetchTodos} from './actions/index.jsx';

const conatinerStyle = {
    padding: '20px',
    maxWidth: '430px',
};

class App extends React.Component {

    showAll() {
        console.log('Show All');
    }

    render() {
        return (
            <div className="container" style={conatinerStyle}>
                <Title />
                <Action onShowAll={this.showAll}/>
                <NewTodo />
                <TodoList />
            </div>
        );
    }
}


/* REDUX - THUNK */
const store = createStore(reducers, applyMiddleware(ReduxThunk));

// Get Initial State
store.dispatch(fetchTodos());
/* REDUX - THUNK */

let rootComponent = document.getElementById('root');
ReactDom.render(<Provider store={store}>
    <App />
</Provider>, rootComponent);


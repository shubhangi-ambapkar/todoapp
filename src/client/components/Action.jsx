import React from 'react';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import { filterTodo } from '../actions/index.jsx';

const buttonStyle = {
    marginRight: '10px'
};

const actionsStyle = {
    padding: '20px 0px'
};

class ActionComponent extends React.Component {
    render() {
        return (
            <div className="actions" style={actionsStyle}>
                <Button style={buttonStyle} color="primary" onClick={this.props.showAll}>Show All</Button>
                <Button style={buttonStyle} color="primary" onClick={this.props.showPending}>Show Pending</Button>
                <Button style={buttonStyle} color="primary" onClick={this.props.showCompleted}>Show Completed</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        showAll: () => dispatch(filterTodo('SHOW_ALL')),
        showCompleted: () => dispatch(filterTodo('SHOW_COMPLETED')),
        showPending: () => dispatch(filterTodo('SHOW_PENDING'))
    };
};

const Action = connect(mapStateToProps, mapDispatchToProps)(ActionComponent);

export default Action;


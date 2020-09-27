import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Share from '@material-ui/icons/Share';
import Delete from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

const todoStyle = {
    padding: '10px 0px',
    display: 'flex',
    flexDirection: 'row',
    lineHeight: '36px'
};

const defTodoTextStyle = {
    minWidth: '300px',
    flex: 1,
    lineHeight: '36px',
    margin: 'auto'
};

function TodoMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {todo} = props;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onRename = () => {
        handleClose();
        props.onRename();
    };

    const onDelete = () => {
        handleClose();
        props.onDelete();
    };

    const menuId = `todo-menu-${todo._id}`;

    return (
        <div>
            <IconButton aria-controls={menuId} aria-haspopup="true" color="primary" onClick={handleClick}><MoreHoriz /></IconButton>
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Share />
                    </ListItemIcon>
                    <Typography>Share ...</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                    </ListItemIcon>
                    <Typography>Move ...</Typography>
                </MenuItem>
                <MenuItem onClick={onRename}>
                    <ListItemIcon>
                    </ListItemIcon>
                    <Typography>Rename ...</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={onDelete}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    <Typography>Delete ...</Typography>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default class Todo extends React.Component {
    constructor() {
        super();
        this.checkboxRef = React.createRef();
    }

    onCompletedChanged() {
        if(this.props.onCompletedChanged) {
            this.props.onCompletedChanged(this.props.todo, this.checkboxRef.current.value);
        }
    }

    render() {
        let todo = this.props.todo;
        let todoTextStyle = Object.assign({}, defTodoTextStyle);
        
        if(todo && todo.completed) {
            todoTextStyle.textDecoration = 'line-through';
        }

        return (
            <div className="todo-item" style={todoStyle}>
                <Checkbox onClick={this.onCompletedChanged.bind(this)} inputRef={this.checkboxRef} checked={todo.completed}/>
                <div className="todo-text" style={todoTextStyle}>
                    {todo.text}
                </div>
                <TodoMenu todo={todo} onRename={this.props.onRename} onDelete={this.props.onDelete} />
            </div>
        );
    }
}

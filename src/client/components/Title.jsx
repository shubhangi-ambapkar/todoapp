import React from 'react';

const titleStyle = {
    padding: '0px 0px 20px 0px',
    fontSize: '18pt'
};

export default class Title extends React.Component {
    render() {
        return (<div className="title" style={titleStyle}>Todo App</div>);
    }
}


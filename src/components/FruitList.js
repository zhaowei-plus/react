import React, { Component } from 'react';

export default class FruitList extends Component {
  render() {
    const { lists } = this.props;
    return (
      <div className="panel-body">
        {
          lists.map(item =>
            <span key={item}>{item}</span>
          )
        }
      </div>
    );
  }
}
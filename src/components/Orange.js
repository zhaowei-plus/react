import React, { Component } from 'react';
import { connect } from 'redux';
import FruitList from './FruitList';

import { Header } from '../containers/Header';
import { Footer } from '../containers/Footer';

@connect(({ oranges }) => ({
  oranges,
}))
export default class Orange extends Component {
  onClick = () => {

  }

  render() {
    const { oranges } = this.props;

    return (
      <div className="panel panel-default">
        <Header title="橘子" />

        <div className="panel-body">
          <FruitList lists={oranges}/>
        </div>

        <Footer btnName="摘橘子" onClick={this.onClick} />
      </div>
    );
  }
}
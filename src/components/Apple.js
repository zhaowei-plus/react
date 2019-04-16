import React, { Component } from 'react';
import { connect } from 'redux';
import FruitList from './FruitList';

import { Header } from '../containers/Header';
import { Footer } from '../containers/Footer';

@connect(({ apples }) => ({
  apples,
}))
export default class Apple extends Component {
  onClick = () => {
    console.log('摘苹果')
  }

  render() {
    const { apples } = this.props;

    return (
      <div className="panel panel-default">
        <Header title="苹果" />

        <div className="panel-body">
          <FruitList lists={apples}/>
        </div>

        <Footer btnName="摘苹果" onClick={this.onClick} />
      </div>
    );
  }
}
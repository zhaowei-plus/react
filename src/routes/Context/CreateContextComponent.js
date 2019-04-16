import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChildStateComponent extends Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    name: PropTypes.string,
    callback: PropTypes.func,
  };

  render() {
    const { name, callback } = this.context;

    console.log(`context.name=${name}`);
    console.log(`context.callback=${callback}`);

    return (
      <div>ChildComponent</div>
    );
  }
}
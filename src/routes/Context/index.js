import React, { Component } from 'react';

import ParentComponent from './ParentComponent';
import NewContextAPI from './ThemeContext';

export default class Context extends Component {
  render() {
    return (
      <ParentComponent />
    );
  }
}
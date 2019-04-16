import React, { Component } from 'react';
import { ChildUnstateComponent, ChildStateComponent } from './ContextTypesComponent';

export default class MiddleComponent extends Component {
  render() {
    return (
      <ChildUnstateComponent />
    );
  }
}
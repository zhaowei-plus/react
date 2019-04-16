import React, { Component } from 'react';

export default class User extends Component {
  constructor(props){
    super(props);

    console.log('constructor User');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return (
      <div>User</div>
    );
  }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * Context的消费者:
 *  1、通过静态属性获取 contextTypes 声明使用的 Context 属性
 *  2、通过 this.context 获取需要的数据信息
 * 
 *  子组件需要通过一个静态属性contextTypes声明后，才能访问父组件Context对象的属性，否则，即使属性名没写错，拿到的对象也是undefined
 * @export
 * @returns
 */
export function ChildUnstateComponent(props, context) {
  // 获取 Context 数据
  const { name, callback } = context;
  console.log(`context.name = ${name}`);
  console.log(`context.callback = ${callback()}`);

  return (
    <div>ChildUnstateComponent</div>
  );
}

/***
 * 无状态组件通过 context 获取数据
 */
ChildUnstateComponent.contextTypes = {
  name: PropTypes.string,
  callback: PropTypes.callback,
};

export class ChildStateComponent extends Component {
  // 声明需要从 Context 上获取的属性
  static contextTypes = {
    name: PropTypes.string,
    callback: PropTypes.func,
  };

  render() {
    // 获取属性值
    const { name, callback } = this.context;
    
    console.log(`context.name = ${name}`);
    console.log(`context.callback = ${callback()}`);

    return (
      <div>ChildStateComponent</div>
    );
  }
}
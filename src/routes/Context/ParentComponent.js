import React, { Component } from 'react';
import ProTypes from 'prop-types';

import MiddleComponent from './MiddleComponent';

/**
 * context 生产者：
 *  1、通过一个静态属性 childContextTypes 声明提供给子组件的 context 对象的属性
 *  2、实现一个 getChildContext 方法，返回一个代表 Context 的纯对象
 *
 * @export
 * @class ParentComponent
 * @extends {Component}
 */
export default class ParentComponent extends Component {
  constructor(props) {
    super(props);
  }

  // 声明需要使用的Context属性
  static childContextTypes = {
    name: ProTypes.string,
    callback: ProTypes.func,
  };
  
  // 返回 Context 对象，方法名是约定好的
  getChildContext() {
    return {
      name: '你好',
      callback: () => "ParentComponent callback",
    };
  }

  render() {
    return (
      <MiddleComponent />
    );
  }
}
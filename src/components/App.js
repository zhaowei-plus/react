import React, { Component } from 'react';
// import { Counter } from './Counter'


/* 姓名，年龄 */

export default class App extends Component {
  constructor(props, context) {
    // 构造函数必须有 super,否则 this 指向会出错
    super(props, context);
  }

  /**
   * 组件将要渲染（可以在客户端、服务器端）
   *  1、组件刚经历 constructor,初始化完成
   *  2、组件还没有进入 render，组件还未渲染完成，dom还未渲染
   *
   *  注：componentWillMount 一般用的比较少，更多的是用在服务端渲染（React SSR）
   */
  componentWillMount() {
    console.log('componentWillMount');
  }

  /**
   * 组件渲染完成，只在客户端：
   *  组件第一次渲染完成，此时dom节点已经生成，可以通过this.getDOMNode() 来进行访问，可以在这里调用ajax请求，返回数据调用setState更新组件数据
   *
   *  注：react 只会在第一次初始化成功的时候调用componentDidMount方法，
   *  之后每次重新渲染都会调用 componentDidUpdate()
   * */
  componentDidMount() {
    console.log('componentDidMount');
  }

  /**
   * Props发生改变，组件将要重新渲染：
   *  接受父组件的props发生改变，在初始化render时不调用
   * */
  componentWillReceiveProps(nextProps) {
    /**
     * 通过对比nextProps和this.props，将nextProps setState为当前组件的state，从而重新渲染组件
     * */
    console.log('componentWillReceiveProps:', nextProps);
  }

  /**
   * 组件接受新的props，state时被调用，在初始化时，或者调用 forceUpdate() 时不被调用，返回布尔值
   * 注：这里可以控制组件是否更新：return false；阻止更新
   *
   * shouldComponentUpdate() 返回 true，组件进入重新渲染流程
   * */
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true;
  }

  /**
   * 组件即将更新：
   *  在组件接收到新的props、state但还没有render时被调用，初始化render()时不被调用
   *  shouldComponentUpdate() 返回 true，进入此生命周期
   * */
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  onClick = () => {
    console.log('摘水果');
  }

  /**
   * render() 会插入jsx 生成的dom结构，react会生成一份虚拟 dom 树，在每次组件更新时，
   * 在此 react 会通过其dif算法比较更新前后的新旧dom树，比较之后，找到最小的有差异的Dom节点，并重新渲染
   *
   * 注：react16版本中，render方法允许返回一个数组，单个字符串等，不在只限制为一个顶级Dom节点，可以减少很多不必要的div，
   * 或者使用Fragment 替换原有的 div
   * */
  render() {
    /**
     * 当render() 方法以来与一些其他数据，可以调用 forceUpdate() 方法重新渲染，此时会跳过 shouldComponentUpdate() 生命周期
     * */
    // this.forceUpdate();
    console.log('render');

    return (
      <div className="panel panel-default">

        <div className="panel-body">
          <div className="container">
            <div className="row">

              <div className="col-md-6">
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * 组件更新，重新渲染之后立即调用
   * 注：在初始化时不会被调用
   * 组件更新完毕，第一次初始化成功时会进入componentDidMount(),
   * 之后每次重新渲染都会进入此生命周期
   * */
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate:', prevProps, prevState);
  }

  /**
   * 组件将要卸载（从DOM中移除的时候立即被调用），通常主要时做以下处理：
   *  1、clear组件中所有的setTimeout,setInterval
   *  2、移除组件中的监听事件：removeEventListener
   *  3、处理Ajax请求（取消渲染）
   * */
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
}

/**
 * react生命周期执行顺序和次数：
 *  1、constructor
 *  2、componentWillMount
 *  3、render
 *   -》 子组件
 *  4、componentDidMount
 *
 *  // 更新
 *  5、shouldComponentUpdate
 *  6、componentWillUpdate
 *  7、render
 *   -》 子组件
 *  8、componentDidUpdate
 * */


/**
 * react refs
 *  refs 提供一个访问render()方法渲染的DOM节点或者React元素的方法
 *
 * 使用场景：
 *  1、管理焦点事件、文本选择、或者媒体播放
 *  2、触发命令性动画
 *  3、和第三方Dom库集成
 *
 *  React会在组件挂载时在DOM元素上调用ref回调(参数就是这个DOM元素)，
 *  在组件卸载时再次调用该ref回调，使用的参数的null
 *
 * 注：尽量避免使用refs
 *
 *  this.textInput = React.createRef();
 *
 *  render() {
 *    return (<div ref={this.textInput}></div>)
 *  }
 *
 *  实例：
 *    模拟React组件挂载后立即获取焦点
 * */
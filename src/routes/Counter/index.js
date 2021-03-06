import React, { Component } from 'react';
// import { Counter } from './Counter'

export default class Counter extends Component {
    constructor(props, context) {
        // 构造函数必须有 super,否则 this 指向会出错, 因为子类没有自己的this对象，只能继承父类的this对象
        super(props, context);

        this.state = {
            name: '张三',
        };
    }

    // React 17将要被删除的生命周期
    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
        fetch('/api/v1/topics', {
                // body: JSON.stringify(data), // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, same-origin, *omit
                /**
                 * credentials: 
                 *  include 浏览器发送包含凭据的请求（即使是跨域源）
                 *  same-origin 请求URL与调用脚本位于同一起源处时发送凭据
                 *  omit 确保浏览器不在请求中包含凭据
                 * */
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json'
                },
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // *client, no-referrer
            })
            .then(function(response) {
                console.log(response);
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
            });
    }

    // 被 getDerivedStateFromProps(props, state) 声明周期替代，在React 17将要被删除
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps:', nextProps);
    }

    // 在每次 render 之前调用
    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps:', props, state);
        // if (props.name !== state.name) {
        //   return {
        //     name: props.name
        //   };
        // }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return true;
    }

    // React 17 将要被删除的生命周期
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }

    // 在render() 之后调用，在componentDidUpdate() 之前调用，返回值作为 componentDidUpdate() 的第三个参数
    getSnapshotBeforeUpdate() {
        console.log('getSnapshotBeforeUpdate');
        return 100;
    }

    onClick = () => {
        console.log('摘水果');
    }

    render() {
        /**
         * 当render() 方法依赖与一些其他数据，可以调用 forceUpdate() 方法重新渲染，此时会跳过 shouldComponentUpdate() 生命周期
         * */
        // this.forceUpdate();
        console.log('render');
        return (
            <div>render</div>
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
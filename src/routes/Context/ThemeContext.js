import React, { Component, Fragment } from 'react';
import MiddleComponent from './MiddleComponent';

/** 
 * react 16.3 对新 API 做了新的调整：
 *  使用静态方法 React.createContext() 创建一个Context对象，这个对象包含两个组件 
 *  <Provider />和<Consumer />
 * 
*/
const ThemeContext = React.createContext({
  info: '哈哈，我是新的Context API',
  desc: '使用静态方法 React.createContext() 创建一个Context对象，这个对象包含两个组件 <Provider />和<Consumer />',
});

class Header extends Component {
  render() {
    return (
      <Title>React Context API</Title>
    );
  }
}

class Title extends Component {
  render() {
    return (
      // <Consumer />的children必须是一个函数，通过函数的参数获取<Provider />提供的Context。
      <ThemeContext.Consumer>
        {
          context => (
            <Fragment>
              <h1>{context.info}</h1>
              <p>{context.desc}</p>
            </Fragment>
          )
        }
      </ThemeContext.Consumer>
    );
  }
}

export default class NewContextAPI extends Component {
  render() {
    return (
      /* <Provider />的value相当于现在的getChildContext() */
      <ThemeContext.Provider value={{info: '新的Context API', desc: '简化使用方法和提高效率'}}>
        <Header />
      </ThemeContext.Provider>
    );
  }
}
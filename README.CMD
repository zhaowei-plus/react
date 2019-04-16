1、react keys
    key是React中实用的一种特殊属性。当元素被创建的时候，React会讲元素的key值和对象的元素绑定存储起来，当组件重新渲染的时候保存已有的状态
    用于追踪列表中那些元素被修改、被添加、被移除的辅助标记

    开发过程中要跑正元素的key在同级元素中具有唯一性。在React diff算法中React会借助元素的key值来判断
    该元素是新创建的还是移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系

2、调用 setState 之后发生了什么？
    1、将参数与组件当前的状态合并
    2、触发调和过程。经过调和过程，React 会以相对高效的方式根据新的状态构建React元素，并重新渲染组件

3、React更新
    1）、React JSX创建React元素，插入到HTML中
    2）更新：React重新渲染生成虚拟的元素树，并自动计算新的树和就的元素树的节点差异，然后根据差异对界面进行最小化重渲染，
    在差异计算算法中，React能够相对精确的知道哪些位置发生了改变以及应该如何改变，从而保证了页面的按需更新

4、React生命周期
    1）初始化阶段：组件被插入DOM中
        constructor - 构造函数初始化
        componentWillMount - 将要挂载节点
        render - 组件生成虚拟的DOM节点
        componentDidMount - 组件在被挂载之后

     2）运行阶段：如果DOM应该被更新，组件重新渲染
        componentWillReceiveProps - 组件将要收到属性的调用
        shouldComponentUpdate - 组件接受新的属性、新的状态调用
        componentWillUpdate - 组件即将更新不能修改属性和状态
        render - 组件重新渲染

      3）销毁节点：组件从DOM中移除
        componentWillUnmount - 组件即将销毁

5、为什么虚拟 dom 会提高性能
    虚拟dom相当于是在js和真实dom之间配置缓存，利用dom diff算法避免了不必要的dom操作，从而提高性能。

    React 渲染过程：
        用jsx语法表示DOM树的结构，然后用这个树构建一个真正的DOM树，当状态发生改变时，重新创建一个虚拟DOM树，将新的树和旧的DOM树比较，记录差异并重新渲染差异节点

6、react diff 原理 ******************
    1）将树形结构按照层级分解，只比较同级元素；
    2）为列表结构的每个单元添加唯一key属性，用于

7、React 中 refs 的作用是什么
    Refs是React提供给我们的安全访问DOM元素或者某个组件实例的具柄。
    我们可以为元素添加ref属性然后在回调函数中结构该元素在DOM树中的句柄，并作为回调函数的第一个参数返回

     static propTypes = {
        username: PropTypes.string.isRequired,
      }

8、组件分类
    1、划分依据：组件的定义方式
        1）函数组件（Functional Component）
            function Welcome(props) {
                return ...
            }
        2）类组件（Class Component）
            ...

            类组件可以维护自身的状态变量，有不同的生命周期，可在不同的生命周期对组件进行控制

    2、划分依据：组件内部是否维护状态state
        1）无状态组件（Stateless Component）
            无状态组件内部不使用State，只根据外部状态传入的Props返回待渲染的React元素
        2）有状态组件（Stateful Component）
            有状态组件内部使用state，维护自身状态的变化。
            有状态组件会根据组件传入的props和自身的state，共同决定最终返回的React元素

     3、划分依据：组件的职责
        1）展示型组件（Oresentational Component）
            展示型组件只关心数据，以及对应的UI展示，可以有自己的state，如：UserList
        2）容器型组件（Container Component）
            容器型组件用于获取和处理数据，并将数据传递给展示型组件，展示数据内容,如：User


        class User extends Component{
            // 容器型组件用于获取和操作数据
            ...

            render() {
                // 展示型组件只用于展示数据
                return <UserList list={this.state.list} />
            }
        }

     4、划分依据：组件状态改变是否受控
        1）受控组件
            组件内部状态改变收到控制，例如：Antd 表单组件，内部数据改变都是收到控制
        2）非受控组件
            非受控组件指组件状态改变不受控制的组件

     注：展示型组件和容器型组件是可以相互嵌套的


     总结：


9、diff算法
    原理：
    1）把树结构按照层级分解，只比较同级元素
    2）针对列表元素

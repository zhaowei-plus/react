/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import invariant from 'shared/invariant';

import ReactNoopUpdateQueue from './ReactNoopUpdateQueue';

const emptyObject = {};
if (__DEV__) {
    Object.freeze(emptyObject);
}

/**
 * 基类助手，用于更新组件的状态。
 */
function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    // 如果组件具有字符串引用，我们稍后将分配一个不同的对象。
    this.refs = emptyObject;
    // 初始化默认的更新程序，但实际的更新程序由渲染器注入。也就是说时动态注入的，那 updater 在哪呢？
    this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */

// partialState 必须是要更新的状态变量，或者返回状态变量的函数
Component.prototype.setState = function(partialState, callback) {
    invariant(
        typeof partialState === 'object' ||
        typeof partialState === 'function' ||
        partialState == null,
        'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
    );

    // TODO 函数内部 this的指向问题
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function(callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 * 
 * 不推荐使用的API。 这些API曾经存在于经典的React类上，但是由于我们要弃用它们，因此我们不会将
 * 它们移到这个现代的基类上。 取而代之的是，我们定义了一个getter，如果它被访问，它会发出警告。
 */
if (__DEV__) {
    //TODO  已经弃用的api，在使用的时候有，给出警告 利用getter钩子
    const deprecatedAPIs = {
        isMounted: [
            'isMounted',
            'Instead, make sure to clean up subscriptions and pending requests in ' +
            'componentWillUnmount to prevent memory leaks.',
        ],
        replaceState: [
            'replaceState',
            'Refactor your code to use setState instead (see ' +
            'https://github.com/facebook/react/issues/3236).',
        ],
    };
    const defineDeprecationWarning = function(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
            get: function() {
                console.warn(
                    '%s(...) is deprecated in plain JavaScript React classes. %s',
                    info[0],
                    info[1],
                );
                return undefined;
            },
        });
    };
    for (const fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
            defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
    }
}

// Dummy 虚拟，假的，傀儡
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 * 
 * 带有默认浅层相等性检查，即浅比较 的sCU便利组件。
 */
function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
}

// TODO 为啥要这么做，PureComponent.prototype = new ComponentDummy()
const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
// TODO 对于这些方法，避免额外的原型跳转。
Object.assign(pureComponentPrototype, Component.prototype);

// Component.prototype.isReactComponent = {};
pureComponentPrototype.isPureReactComponent = true;


/*** TODO prototype
 * prototype是一个对象，通过 prototype 添加的属性将会成为使用这个构造函数创建的对象的通用属性
 * 
 * https://www.cnblogs.com/wulihong/p/8906231.html
 */

export { Component, PureComponent };
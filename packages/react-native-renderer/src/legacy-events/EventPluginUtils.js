/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { invokeGuardedCallbackAndCatchFirstError } from 'shared/ReactErrorUtils';
import invariant from 'shared/invariant';

export let getFiberCurrentPropsFromNode = null;
export let getInstanceFromNode = null;
export let getNodeFromInstance = null;

export function setComponentTree(
    getFiberCurrentPropsFromNodeImpl,
    getInstanceFromNodeImpl,
    getNodeFromInstanceImpl,
) {
    getFiberCurrentPropsFromNode = getFiberCurrentPropsFromNodeImpl;
    getInstanceFromNode = getInstanceFromNodeImpl;
    getNodeFromInstance = getNodeFromInstanceImpl;
    if (__DEV__) {
        if (!getNodeFromInstance || !getInstanceFromNode) {
            console.error(
                'EventPluginUtils.setComponentTree(...): Injected ' +
                'module is missing getNodeFromInstance or getInstanceFromNode.',
            );
        }
    }
}

let validateEventDispatches;
if (__DEV__) {
    validateEventDispatches = function(event) {
        const dispatchListeners = event._dispatchListeners;
        const dispatchInstances = event._dispatchInstances;

        const listenersIsArr = Array.isArray(dispatchListeners);
        const listenersLen = listenersIsArr ?
            dispatchListeners.length :
            dispatchListeners ?
            1 :
            0;

        const instancesIsArr = Array.isArray(dispatchInstances);
        const instancesLen = instancesIsArr ?
            dispatchInstances.length :
            dispatchInstances ?
            1 :
            0;

        if (instancesIsArr !== listenersIsArr || instancesLen !== listenersLen) {
            console.error('EventPluginUtils: Invalid `event`.');
        }
    };
}

/**
 * Dispatch the event to the listener.
 * 
 * 将事件发送给侦听器。
 * 
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */
export function executeDispatch(event, listener, inst) {
    const type = event.type || 'unknown-event';
    // currentTarget 当前触发事件的元素
    event.currentTarget = getNodeFromInstance(inst);

    // 事件分发,listener为callback,event为参数,类似listener(event)这个方法调用
    // 这样就回调到了我们在JSX中注册的callback。比如onClick={(event) => {console.log(1)}}
    // 这样应该就明白了callback怎么被调用的,以及event参数怎么传入callback里面的了
    invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
    event.currentTarget = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 * 
 * 通过事件的收集调度进行标准/简单迭代。
 * 
 * 事件处理的核心
 * 
 * executeDispatchesInOrder 会先得到event对应的listeners队列，然后从当前元素向父元素遍历执行注册的callback isPropagationStopped
 */
export function executeDispatchesInOrder(event) {
    const dispatchListeners = event._dispatchListeners; // 侦听器
    const dispatchInstances = event._dispatchInstances; // 实例

    if (__DEV__) {
        validateEventDispatches(event);
    }

    if (Array.isArray(dispatchListeners)) {
        // 如果有多个listener,则遍历执行数组中event
        for (let i = 0; i < dispatchListeners.length; i++) {
            // 如果isPropagationStopped设成true了,则停止事件传播,退出循环。
            if (event.isPropagationStopped()) {
                break;
            }
            // Listeners and Instances are two parallel arrays that are always in sync.
            // 侦听器和实例是两个始终保持同步的并行阵列。

            // 执行event的分发,从当前触发事件元素向父元素遍历
            // event为浏览器上传的原生事件
            // dispatchListeners[i]为JSX中声明的事件callback
            // dispatchInstances[i]为对应的React Component 
            executeDispatch(event, dispatchListeners[i], dispatchInstances[i]);
        }
    } else if (dispatchListeners) {
        // 如果只有一个listener,则直接执行事件分发
        executeDispatch(event, dispatchListeners, dispatchInstances);
    }

    // 处理完event,重置变量。因为使用的对象池,故必须重置,这样才能被别人复用
    event._dispatchListeners = null;
    event._dispatchInstances = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return {?string} id of the first dispatch execution who's listener returns
 * true, or null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrueImpl(event) {
    const dispatchListeners = event._dispatchListeners;
    const dispatchInstances = event._dispatchInstances;
    if (__DEV__) {
        validateEventDispatches(event);
    }
    if (Array.isArray(dispatchListeners)) {
        for (let i = 0; i < dispatchListeners.length; i++) {
            if (event.isPropagationStopped()) {
                break;
            }
            // Listeners and Instances are two parallel arrays that are always in sync.
            if (dispatchListeners[i](event, dispatchInstances[i])) {
                return dispatchInstances[i];
            }
        }
    } else if (dispatchListeners) {
        if (dispatchListeners(event, dispatchInstances)) {
            return dispatchInstances;
        }
    }
    return null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */
export function executeDispatchesInOrderStopAtTrue(event) {
    const ret = executeDispatchesInOrderStopAtTrueImpl(event);
    event._dispatchInstances = null;
    event._dispatchListeners = null;
    return ret;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */
export function executeDirectDispatch(event) {
    if (__DEV__) {
        validateEventDispatches(event);
    }
    const dispatchListener = event._dispatchListeners;
    const dispatchInstance = event._dispatchInstances;
    invariant(!Array.isArray(dispatchListener),
        'executeDirectDispatch(...): Invalid `event`.',
    );
    event.currentTarget = dispatchListener ?
        getNodeFromInstance(dispatchInstance) :
        null;
    const res = dispatchListener ? dispatchListener(event) : null;
    event.currentTarget = null;
    event._dispatchListeners = null;
    event._dispatchInstances = null;
    return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */
export function hasDispatches(event) {
    return !!event._dispatchListeners;
}
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// 事件冒泡 Bubble
// 事件捕获 Capture

export function addEventBubbleListener(
    target: EventTarget,
    eventType: string,
    listener: Function,
): Function {
    target.addEventListener(eventType, listener, false);
    return listener;
}

export function addEventCaptureListener(
    target: EventTarget,
    eventType: string,
    listener: Function,
): Function {
    target.addEventListener(eventType, listener, true);
    return listener;
}

export function addEventCaptureListenerWithPassiveFlag(
    target: EventTarget,
    eventType: string,
    listener: Function,
    passive: boolean,
): Function {
    target.addEventListener(eventType, listener, {
        capture: true, // 事件捕获
        passive, // passive true 表示 listener 永远不会调用 preventDefault()，如果调用，则会跑出警告
        // TODO 使用 passive 优化性能：https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E4%BD%BF%E7%94%A8_passive_%E6%94%B9%E5%96%84%E7%9A%84%E6%BB%9A%E5%B1%8F%E6%80%A7%E8%83%BD
    });
    return listener;
}

export function addEventBubbleListenerWithPassiveFlag(
    target: EventTarget,
    eventType: string,
    listener: Function,
    passive: boolean,
): Function {
    target.addEventListener(eventType, listener, {
        passive,
    });
    return listener;
}

export function removeEventListener(
    target: EventTarget,
    eventType: string,
    listener: Function,
    capture: boolean,
): void {
    target.removeEventListener(eventType, listener, capture);
}
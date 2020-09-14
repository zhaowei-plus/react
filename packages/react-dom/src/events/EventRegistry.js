/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { DOMEventName } from './DOMEventNames';

import { enableEagerRootListeners } from 'shared/ReactFeatureFlags';

export const allNativeEvents: Set < DOMEventName > = new Set();

/**
 * Mapping from registration name to event name
 * 
 * 映射：注册名 -> 事件名
 */
export const registrationNameDependencies = {};

/**
 * Mapping from lowercase registration names to the properly cased version,
 * used to warn in the case of missing event handlers. Available
 * only in __DEV__.
 * @type {Object}
 */
export const possibleRegistrationNames = __DEV__ ? {} : (null: any);
// Trust the developer to only use possibleRegistrationNames in __DEV__

// TODO 注册两个阶段的事件：冒泡 + 捕获
export function registerTwoPhaseEvent(registrationName: string, dependencies: Array < DOMEventName > ): void {
    registerDirectEvent(registrationName, dependencies);
    registerDirectEvent(registrationName + 'Capture', dependencies);
}


export function registerDirectEvent(
    registrationName: string,
    dependencies: Array < DOMEventName > ,
) {
    if (__DEV__) {
        if (registrationNameDependencies[registrationName]) {
            console.error(
                'EventRegistry: More than one plugin attempted to publish the same ' +
                'registration name, `%s`.',
                registrationName,
            );
        }
    }

    // 添加注册映射
    registrationNameDependencies[registrationName] = dependencies;

    if (__DEV__) {
        const lowerCasedName = registrationName.toLowerCase();
        possibleRegistrationNames[lowerCasedName] = registrationName;

        if (registrationName === 'onDoubleClick') {
            possibleRegistrationNames.ondblclick = registrationName;
        }
    }

    // 是否将事件挂载到跟节点上
    if (enableEagerRootListeners) {
        for (let i = 0; i < dependencies.length; i++) {
            allNativeEvents.add(dependencies[i]);
        }
    }
}
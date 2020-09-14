/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */

import invariant from 'shared/invariant';
import { rethrowCaughtError } from 'shared/ReactErrorUtils';

import type { ReactSyntheticEvent } from './ReactSyntheticEventType';
import accumulateInto from './accumulateInto';
import forEachAccumulated from './forEachAccumulated';
import { executeDispatchesInOrder } from './EventPluginUtils';

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
let eventQueue: ? (Array < ReactSyntheticEvent > | ReactSyntheticEvent) = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * 调度事件并将其释放回池中，除非持续存在
 * @param {?object} event Synthetic event to be dispatched.
 * @private
 */
const executeDispatchesAndRelease = function(event: ReactSyntheticEvent) {
    if (event) {
        // 事件分发
        executeDispatchesInOrder(event);

        if (!event.isPersistent()) {
            // 处理完,则release掉event对象,采用对象池方式,减少GC
            // React帮我们处理了合成事件的回收机制，不需要我们关心。但要注意，如果使用了DOM原生事件，则要自己回收
            event.constructor.release(event);
        }
    }
};
const executeDispatchesAndReleaseTopLevel = function(e) {
    // 执行调度并释放
    return executeDispatchesAndRelease(e);
};

export function runEventsInBatch(events: Array < ReactSyntheticEvent > | ReactSyntheticEvent | null) {

    if (events !== null) {
        // syntheticEvent放入队列中,等到 processingEventQueue 再获得执行
        eventQueue = accumulateInto(eventQueue, events);
    }

    // Set `eventQueue` to null before processing it so that we can tell if more events get enqueued while processing.
    // 在处理之前将`eventQueue`设置为null，这样我们就可以知道在处理过程中是否有更多事件排队。
    // 再处理队列中的事件,包括之前未处理完的。先入先处理原则
    const processingEventQueue = eventQueue;
    eventQueue = null;

    if (!processingEventQueue) {
        return;
    }

    // 遍历处理队列中的事件,
    // 如果只有一个元素,则直接executeDispatchesAndReleaseTopLevel(processingEventQueue)
    // 否则遍历队列中事件,调用executeDispatchesAndReleaseTopLevel处理每个元素

    // 分发执行队列中的React合成事件。React事件是采用消息队列方式批处理的

    forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
    invariant(!eventQueue,
        'processEventQueue(): Additional events were enqueued while processing ' +
        'an event queue. Support for this has not yet been implemented.',
    );
    // This would be a good time to rethrow if any of the event handlers threw.
    rethrowCaughtError();
}
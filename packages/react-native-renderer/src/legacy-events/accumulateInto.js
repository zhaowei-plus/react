/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import invariant from 'shared/invariant';

/**
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */

// TODO 将合成事件添加到events事件队列中
function accumulateInto < T > (
    current: ? (Array < T > | T),
    next : T | Array < T > ,
): T | Array < T > {
    invariant(
        next != null,
        'accumulateInto(...): Accumulated items must not be null or undefined.',
    );

    if (current == null) {
        return next;
    }

    // Both are not empty. Warning: Never call x.concat(y) when you are not
    // certain that x is an Array (x could be a string with concat method).

    // 将next添加到current中,返回一个包含他们两个的新数组
    // 如果next是数组, current不是数组,采用push方法,否则采用concat方法
    // 如果next不是数组, 则返回一个current和next构成的新数组
    if (Array.isArray(current)) {
        if (Array.isArray(next)) {
            current.push.apply(current, next);
            return current;
        }
        current.push(next);
        return current;
    }

    if (Array.isArray(next)) {
        return [current].concat(next);
    }

    return [current, next];
}

export default accumulateInto;
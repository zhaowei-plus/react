import React, { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button class="btn btn-default" onClick={ () => setCount(count + 1)}>
        click me
      </button>
    </div>
  )
}
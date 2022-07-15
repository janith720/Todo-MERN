import React from 'react'

export default function TodoItem({ todoItem,edit,deleted}) {
  return (
    <div style={{display: 'flex', padding: '20px'}}>
        <p style={{padding: '10px',marginRight: '20px'}}>{todoItem}</p>
        <button onClick={edit}>Edit</button>
        <button onClick={deleted}>Delete</button>
    </div>
  )
}

import React from 'react'
import { convertUTCtoLocal } from './utils'

const TaskList = (props) => {
  return (
    <div className='my-3 bg-white rounded shadow-sm'>
      <div>
        {props.allTasks.map((task) => {
          const startedLocalDateTime = convertUTCtoLocal(task.startedAt)
          const endedLocalDateTime = convertUTCtoLocal(task.endedAt)
          return (
            <div
              className='row m-2 py-2 border-bottom border-gray align-items-center d-flex justify-content-between'
              key={task.id}
            >
              <div className='col'>
                <span>{task.name}</span>
                <span className='ml-2 badge badge-info'>{task.category}</span>
              </div>
              <div className='col'>{task.username}</div>
              <div className='col'>{startedLocalDateTime.date}</div>
              <div className='col'>{`${startedLocalDateTime.time} - ${endedLocalDateTime.time}`}</div>
              <div className=''>
                <button className='btn btn-danger' onClick={() => props.onRemoveClicked(task.id)}>
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TaskList

import React from 'react'

import { StopWatch } from './StopWatch'

const TaskCreator = (props) => {
  return (
    <div className='row'>
      <div className='col-7'>
        <input
          type='text'
          placeholder='What are you working on?'
          className='form-control form-control-lg'
          name='task'
          value={props.taskName}
          onChange={props.onTaskChange}
        />
      </div>
      <div className='form-group'>
        <select
          className='form-control form-control-lg custom-select'
          id='category'
          style={{ height: '45px' }}
          onChange={props.onCategoryChange}
        >
          <option disabled='' selected=''>
            Category
          </option>
          <option selected={props.category === 'study'}>study</option>
          <option selected={props.category === 'workout'}>workout</option>
          <option selected={props.category === 'housekeeping'}>housekeeping</option>
        </select>
      </div>
      <div className='col'>
        {props.isStarted === true ? (
          <button type='button' className='btn btn-danger btn-lg' onClick={props.onAddClicked}>
            Stop
          </button>
        ) : (
          <button type='button' className='btn btn-success btn-lg' onClick={props.onAddClicked}>
            Start
          </button>
        )}
      </div>
      <StopWatch isWatchStarted={props.isStarted} />
    </div>
  )
}

export default TaskCreator

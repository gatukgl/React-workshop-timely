import React from 'react'
import './App.css'

const NavBar = (props) => {
  // console.log(props)
  return (
    <nav role='navigation' className='navbar fixed-top navbar-dark bg-dark'>
      <a className='navbar-brand' href='.'>
        Timely
      </a>
      <div style={{ color: '#fff' }}>{props.name}</div>
    </nav>
  )
}

const TaskCreator = (props) => {
  console.log(props)
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
        <button type='button' className='btn btn-success btn-lg'>
          Start
        </button>
      </div>
      <div className='col' style={{ fontSize: '1.9em' }}>
        00:00:00
      </div>
    </div>
  )
}

const NoTask = () => {
  return (
    <div className='text-center p-5 my-3 rounded shadow-sm text-dark'>
      <span>No task yet</span>
    </div>
  )
}

const TaskList = (props) => {
  return (
    <div className='my-3 bg-white rounded shadow-sm'>
      <div>
        {props.allTasks.map((task) => {
          console.log(task)
          return (
            <div className='row m-2 py-2 border-bottom border-gray align-items-center d-flex justify-content-between'>
              <div className='col'>
                <span>{task.name}</span>
                <span className='ml-2 badge badge-info'>{task.category}</span>
              </div>
              <div className='col'>{task.username}</div>
              <div className='col'>{task.date}</div>
              <div className='col'>{`${task.startedAt} - ${task.endedAt}`}</div>
              <div className=''>
                <button className='btn btn-danger'>Remove</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

class App extends React.Component {
  state = {
    task: '',
    category: 'study',
    allTasks: [
      {
        name: 'Task 1',
        category: 'Workshop',
        username: 'Gatuk',
        date: 'Saturday, May 9, 2020',
        startedAt: '2:10:35 PM',
        endedAt: '3:10:35 PM'
      },
      {
        name: 'Task 2',
        category: 'Study',
        username: 'Gatuk',
        date: 'Saturday, May 9, 2020',
        startedAt: '2:10:35 PM',
        endedAt: '3:10:35 PM'
      }
    ]
  }

  onTaskChange = (event) => {
    console.log(event.target.value)
    this.setState({ task: event.target.value })
  }

  onCategoryChange = (event) => {
    this.setState({ category: event.target.value })
  }

  render() {
    const name = 'Gatuk'
    return (
      <div className='App'>
        <NavBar name={name} />
        <div className='container' role='main' style={{ marginTop: '100px' }}>
          <TaskCreator
            taskName={this.state.task}
            onTaskChange={this.onTaskChange}
            category={this.state.category}
            onCategoryChange={this.onCategoryChange}
          />
          <NoTask />
          <TaskList allTasks={this.state.allTasks} />
        </div>
      </div>
    )
  }
}

export default App

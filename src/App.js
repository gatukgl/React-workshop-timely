import React from 'react'
import './App.css'
import { StopWatch } from './StopWatch'
import { nowUTC, convertUTCtoLocal } from './utils'
import axios from 'axios'

const NavBar = (props) => {
  const username = window.sessionStorage.getItem('username')
  return (
    <nav role='navigation' className='navbar fixed-top navbar-dark bg-dark'>
      <a className='navbar-brand' href='.'>
        Timely
      </a>
      <div style={{ color: '#fff' }}>{username}</div>
    </nav>
  )
}

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
          const startedLocalDateTime = convertUTCtoLocal(task.startedAt)
          const endedLocalDateTime = convertUTCtoLocal(task.endedAt)
          return (
            <div className='row m-2 py-2 border-bottom border-gray align-items-center d-flex justify-content-between' key={task.id}>
              <div className='col'>
                <span>{task.name}</span>
                <span className='ml-2 badge badge-info'>{task.category}</span>
              </div>
              <div className='col'>{task.username}</div>
              <div className='col'>{startedLocalDateTime.date}</div>
              <div className='col'>{`${startedLocalDateTime.time} - ${endedLocalDateTime.time}`}</div>
              <div className=''>
                <button className='btn btn-danger' onClick={() => props.onRemoveClicked(task.id)}>Remove</button>
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
    allTasks: [],
    isStarted: false,
    startedAt: '',
    endedAt: ''
  }

  componentDidMount() {
    axios.get('http://ec2-13-250-104-160.ap-southeast-1.compute.amazonaws.com:8000/tasks')
    .then((response) => {
      const tasksFromAPI = response.data
      const allTasks = tasksFromAPI.map((task) => {
      return {
        id: task.id,
        name: task.name,
        category: task.category,
        username: task.username,
        startedAt: task.started_at,
        endedAt: task.ended_at
        }
      })
      this.setState({ allTasks: allTasks })
    })
    // this.setState({allTasks: [{name: 'name', category:'category, username: 'username', startedAt: '', endedAt: ''}]}
  }

  onTaskChange = (event) => {
    this.setState({ task: event.target.value })
  }

  onCategoryChange = (event) => {
    this.setState({ category: event.target.value })
  }

  onAddClicked = () => {
    // add task to state allTasks
    // allTasks = [{name: 'task name', category: 'study'}, {}, {}]
    const currentDateTime = nowUTC()
    const newTask = {
      name: this.state.task,
      category: this.state.category,
      startedAt: this.state.startedAt,
      endedAt: currentDateTime,
      username: window.sessionStorage.getItem('username')
    }

    const isStarted = !this.state.isStarted
    this.setState({ isStarted: isStarted })

    if (isStarted === true) {
      this.setState({ startedAt: currentDateTime })
    } else {
      const newAllTasks = this.state.allTasks.concat(newTask)
      this.setState({ allTasks: newAllTasks })
      this.setState({ endedAt: currentDateTime })

      axios.post('http://ec2-13-250-104-160.ap-southeast-1.compute.amazonaws.com:8000/tasks',{
        name: this.state.task,
        category: this.state.category,
        started_at: this.state.startedAt,
        ended_at: currentDateTime,
        username: window.sessionStorage.getItem('username')
      })
    }
  }

  onRemoveClicked = (taskId) => {
    const currentAllTasks = this.state.allTasks
    const newAllTasks = currentAllTasks.filter(task => task.id !== taskId)
    this.setState({ allTasks: newAllTasks })
    axios.delete(`http://ec2-13-250-104-160.ap-southeast-1.compute.amazonaws.com:8000/tasks/${taskId}`)
  }

  render() {
    return (
      <div className='App'>
        <NavBar />
        <div className='container' role='main' style={{ marginTop: '100px' }}>
          <TaskCreator
            taskName={this.state.task}
            onTaskChange={this.onTaskChange}
            category={this.state.category}
            onCategoryChange={this.onCategoryChange}
            onAddClicked={this.onAddClicked}
            isStarted={this.state.isStarted}
          />
          {
            this.state.allTasks.length < 1 ? (
              <NoTask />
            ) : (
              <TaskList allTasks={this.state.allTasks} onRemoveClicked={this.onRemoveClicked} />
            )
            // if (this.state.allTasks.length < 1) {
            //   return <NoTask />
            // } else {
            //   return <TaskList allTasks={this.state.allTasks}
            // }
          }
        </div>
      </div>
    )
  }
}

export default App

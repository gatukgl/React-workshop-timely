import React from 'react'

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

export default NavBar

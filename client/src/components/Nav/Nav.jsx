import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styles from './nav.module.scss'
function Nav() {
  return (
    <div>
      <nav className={styles.navclass}>
          <Link to="/">EventHub</Link>
        <ul>
          <Link to="/events">Events</Link>
          <Link to="/new-event">Organize</Link>
          {/* <Link to="/services">Services</Link> */}
          <Link to="edit-event/67aa1fbe85b18de507d98d57">Edit</Link>
          <Link to="/event/67aa1fbe85b18de507d98d57">Show</Link>
          <Link to="/">Login</Link>
          <Link to="/">Register</Link>
          <Link to="/profile">Profile</Link>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Nav
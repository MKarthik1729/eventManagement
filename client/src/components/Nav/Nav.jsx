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
          <Link to="/">Login</Link>
          <Link to="/">Register</Link>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Nav
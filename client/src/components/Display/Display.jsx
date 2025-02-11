import React, { useState } from 'react'
// import { useLocation } from 'react-router-dom'
import styles from './display.module.scss'

function Display() {
  // const location = useLocation()
  const [log, setLog] = useState(false)
  // console.log(location)
  const Change = (x) => {
    setLog(x)
  }
  return (
    <div className={styles.display}>
      <section className={styles.intro}>
      {/* <h1>Display</h1> */}
      <h2>Effortless Event Management at Your Fingertips</h2>
<p>Welcome to EventHub, the ultimate event management platform designed to help you create, organize, and attend events seamlessly. Whether you're planning a corporate seminar, a music festival, or a casual meetup, our platform makes it easy to bring people together.</p>

<p>Why Choose Us?</p>
<p>✅ Simple & Secure Authentication – Register, log in, or use our Guest Mode for quick access.</p>
<p>✅ Create & Manage Events – Set up events with details like date, time, and description in just a few clicks.</p>
<p>✅ Real-Time Attendee Tracking – Stay updated with live attendance stats using our cutting-edge technology.</p>
<p>✅ Smart Event Dashboard – Filter and explore upcoming and past events effortlessly.</p>
<p>✅ Fully Responsive – Access and manage events from any device, anytime, anywhere.</p>

<p>🎉 Start organizing your next big event today!</p>

<p>👉 Sign Up Now and experience seamless event planning like never before!</p>
      </section>

      <section className={styles.log}>
        <div>
          <p className={log ? styles.active:""} onClick={()=>Change(true)}>Login</p>
          <p className={!log ? styles.active:""} onClick={()=>Change(false)}>Register</p>
        </div>

        {log && (<div className={styles.login}>

          <form>
            <input type='email' placeholder='Email Here' required />
            <input type='password' placeholder='Password Here' required />
            <button className={styles.col}>Login</button>
            <button>SignIn using Email</button>
            <button>signIn using GitHub</button>
          </form>
        </div>
        )}
        {!log && (
          <div className={styles.login}>
          <form>
            <input type='text' placeholder='Name Here' required />
            <input type='email' placeholder='Email Here' required />
            <input type='password' placeholder='Password Here' required />
            <input type='password' placeholder='Confirm Password Here' required />
            <button className={styles.col}>Register</button>
          </form>
          </div>
        )}
      </section>
    </div>
  )
}

export default Display
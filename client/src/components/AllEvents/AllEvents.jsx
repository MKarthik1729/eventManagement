import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import Event from '../Profile/Event'
import Events from './Events'
import styles from './allevents.module.scss'
function AllEvents() {
  const [events, setEvents] = useState()
  

  useEffect(() => {
    axios.get('/events').then((response) => {
      console.log(response.data)
      setEvents([...response.data,...response.data,...response.data,...response.data,...response.data])
    })
  }, [])

  return (
    <div className={styles.events}>
      {events && events.map((event) => {
        return (
          <div className={styles.events} key={event._id}>
            <Events  event={event} />
          </div>
        )
      })}
    </div>
  )

}

export default AllEvents
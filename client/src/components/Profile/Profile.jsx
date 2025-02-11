import React from 'react'
import { useEffect, useState } from 'react'
import styles from './profile.module.scss'
import axios from 'axios'
import Event from './Event'

function Profile() {
  const [event, setEvent] = useState()
  const [events, setEvents] = useState()
  // const [image, setImage] = useState()

  useEffect(() => {
    axios.get(`/myevents/67a8633512a9451a3e38a1d5`).then((response) => {
      setEvents(response.data)
      setEvent(response.data[0])
      // setImage(response.data[0].images[0])
    })
  }, [])

  return (
    <div className={styles.container}>
      <section className={styles.profile}>
        <ul>
        <li>Karthik</li>
        <li>karthik@gmail.com</li>
        </ul>
        <ol>
          {events && events.map((even) => {
            return <li key={even._id} onClick={()=>{setEvent(even);setImage(even.images[[0]])}} className={event.name===even.name?styles.active:""} >{even.name}</li>
          })}
        </ol>
      </section> 
      <section>
      {event && <Event event={event} imag={event.images[0]}  />
        }
      </section>
    </div>
  )

}
export default Profile


// export default AllEvents
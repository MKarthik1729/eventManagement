import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

function Profile() {
  const [events, setEvents] = useState()

  useEffect(() => {
    axios.get(`/myevents/67a8633512a9451a3e38a1d5`).then((response) => {
      console.log(response.data)
      setEvents(response.data)
    })
  }, [])

  return (
    <div>
      {events && events.map((event) => {
        return (
          <div key={event._id}>
            <h1>{event.name}</h1>
            <p>{new Date(event.date).toISOString().split("T")[0]}
</p>
            <p>{event.desc}</p>
            {event.images.map((image) => { 
              return <img key={image} style={{"width":"200px"}} src={image} alt='event' />
             })}
          </div>
        )
      })}
    </div>
  )

}
export default Profile


// export default AllEvents
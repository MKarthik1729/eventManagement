import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function EventDisplay() {
    const [event, setEvent] = useState()
    const {id}=useParams()
    // console.log(id)
  
  
      useEffect(() => {
        // console.log("cool",id)
      axios.get(`/events/${id}`).then((response) => {
        // console.log(response.data[0])
        setEvent(response.data[0])
      })
    }, [])
  return (
    <div>
        {event &&
          <div >
            <h1>{event.name}</h1>
            <p>{new Date(event.date).toISOString().split("T")[0]}
</p>
            <p>{event.desc}</p>
            {event.images.map((image) => { 
              return <img key={image} style={{"width":"200px"}} src={image} alt='event' />
             })}
          </div>
        }
    </div>
  )
}

export default EventDisplay
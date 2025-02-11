import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function EditEvent() {
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
      {event && <form>
      <label >Event Name
      <input type="text" name="name" defaultValue={event.name} />
      </label>
      <label >Event Date
      <input  onChange={(e)=>console.log(e.target.value)} type="date" name="date" defaultValue={new Date(event.date).toISOString().split("T")[0]} />
      </label>

      <label>
        Event Time
        <input type="text" name="venue" defaultValue={event.time}/>
      </label>

      <label >Event Description
      <input type="text" name="description" defaultValue={event.desc} />
      </label>
      <label>
        Venue 
        <input type="text" name="venue" defaultValue={event.venue}/>
      </label>
      <label>
        Images 
        <input type="file" multiple name="images" />
      </label>
      <button type="submit">Create Event</button>

      </form>
      }
    </div>
  )

}

export default EditEvent
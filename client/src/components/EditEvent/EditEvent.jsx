import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './edit.module.scss'

function EditEvent() {
  const [event, setEvent] = useState()
  const {id}=useParams()


    useEffect(() => {
    axios.get(`/events/${id}`).then((response) => {
      response.data[0].images = [...response.data[0].images,...response.data[0].images,...response.data[0].images,...response.data[0].images]
      setEvent(response.data[0])
    })
  }, [])

  return (
    <div className={styles.editing}>
      {event && 
      
      <div  className={styles.edit}>
      <form >
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
      <button type="submit">Edit Event</button>

      </form>
      </div>
      }
      {
        event && <div className={styles.images}>
          {/* <h2>Images</h2> */}
          {
            event.images.map(img=>{
              return <div>
                <img src={img} />
                <p>delete</p>
                </div>
            })
          }

        </div>

      }
    </div>
  )

}

export default EditEvent
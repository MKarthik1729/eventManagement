import React, { useState } from 'react'
import styles from './events.module.scss'
import {useNavigate} from 'react-router-dom'

function Events({ event }) {
    const navigate = useNavigate()
    const [image,setImage] = useState(event.images[0])
    console.log(event)  
    return (<div key={event._id} className={styles.event}>
        <div>
            <div>
                {event.images.map((imag) => <li key={imag} onClick={() => setImage(imag)} className={imag === image ? styles.active : ""}>{imag._id}</li>)}
            </div>
            <img src={image} alt='event' />
        </div>

        <div className={styles.data}>
            <h1>{event.name}</h1>
            <p>{new Date(event.date).toISOString().split("T")[0]}
            </p>
            <p>{event.desc}</p>
            <footer>
                {/* <button onClick={()=>navigate(`/edit-event/${event._id}`)}>Edit</button> */}
                <button onClick={()=>navigate(`/event/${event._id}`)} >Details</button>
            </footer>
        </div>
    </div>
    )
}

export default Events
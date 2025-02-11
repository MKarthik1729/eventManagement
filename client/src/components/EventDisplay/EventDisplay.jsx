// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// function EventDisplay() {
//     const [event, setEvent] = useState()
//     const {id}=useParams()
  
//       useEffect(() => {
//       axios.get(`/events/${id}`).then((response) => {
//         setEvent(response.data[0])
//       })
//     }, [])
//   return (
//     <div>
//         {event &&
//           <div >
//             <h1>{event.name}</h1>
//             <p>{new Date(event.date).toISOString().split("T")[0]}
// </p>
//             <p>{event.desc}</p>
//             {event.images.map((image) => { 
//               return <img key={image} style={{"width":"200px"}} src={image} alt='event' />
//              })}
//           </div>
//         }
//     </div>
//   )
// }

// export default EventDisplay





import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Event from '../Profile/Event'

function EventDisplay() {
  const [event, setEvent] = useState()
  const {id}=useParams()
  const [image, setImage] = useState()

    useEffect(() => {
    axios.get(`/events/${id}`).then((response) => {
      setEvent(response.data[0])
      setImage(response.data[0].images[0])
    })
  }, [])

  return (
    <div style={{
      margin:"0 10vw",
    }}>
      {event && <Event style={{width:"60vw"}}  event={event}  />}
      
    </div>
  )

}

export default EventDisplay
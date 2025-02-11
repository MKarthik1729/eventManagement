import React from 'react'

function NewEvent() {
  return (
    <div>
      <form>
      <label >Event Name
      <input type="text" name="name" />
      </label>
      <label >Event Date
      <input  onChange={(e)=>console.log(e.target.value)} type="date" name="date" />
      </label>
      <label >Event Description
      <input type="text" name="description" />
      </label>
      <label>
        Venue 
        <input type="text" name="venue" />
      </label>
      <label>
        Images 
        <input type="file" multiple name="images" />
      </label>
      <button type="submit">Create Event</button>

      </form>
    </div>
  )
}

export default NewEvent
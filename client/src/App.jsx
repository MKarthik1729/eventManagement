import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
// import Cookies from 'js-cookie'

import { AllEvents, Display, Nav, NewEvent, EditEvent, Welcome, Profile, EventDisplay } from './components/Components'
// import {sty}
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  // axios.defaults.baseURL = 'http://localhost:3000'
  axios.defaults.baseURL = 'https://event-server-ahqg.onrender.com/'
  // const [count, setCount] = useState(0)
  // Cookies.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E5NjI5NGI2OGI2MGRjOWNmNDAxZmEiLCJpYXQiOjE3MzkxOTk1NTIsImV4cCI6MTczOTI4NTk1Mn0.Us0EPRLZtvJKsg2qmPdMWSSfBRccb6teVTj0RMTIHyw')

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Nav />} >
          <Route path="/" exact element={<Display />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-event" element={<NewEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path='/event/:id' element={<EventDisplay />} />
          <Route path="/home" element={<Welcome />} />
          <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

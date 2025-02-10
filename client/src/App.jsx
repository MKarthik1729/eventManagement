import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AllEvents, Display, Nav, NewEvent, EditEvent, Welcome, Profile } from './components/Components'
// import {sty}
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Nav />} >
          <Route path="/" exact element={<Display />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-event" element={<NewEvent />} />
          <Route path="/edit-event" element={<EditEvent />} />
          <Route path="/home" element={<Welcome />} />
          <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

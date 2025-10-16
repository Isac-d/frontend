import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/HomePage/Homepage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
      </Routes>
    </>
  )
}

export default App

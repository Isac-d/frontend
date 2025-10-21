import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/HomePage/Homepage'
import AdminPage from './Pages/AdminPage/AdminPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/secret-admin' element={<AdminPage/>}/>
      </Routes>
    </>
  )
}

export default App

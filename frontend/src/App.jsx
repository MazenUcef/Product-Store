import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Products from './pages/Products'

const App = () => {
  return (
    <div className='min-h-screen bg-base-200 transition-colors duration-300'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Products />} />
      </Routes>
    </div>
  )
}

export default App
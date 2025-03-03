import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Products from './pages/Products'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const { theme } = useThemeStore()
  return (
    <div className='min-h-screen bg-base-200 transition-colors duration-300' data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Products />} />
      </Routes>
    </div>
  )
}

export default App
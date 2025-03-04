import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import { useThemeStore } from './store/useThemeStore'
import { Toaster } from 'react-hot-toast'
import ProductPage from './pages/ProductPage'

const App = () => {
  const { theme } = useThemeStore()
  return (
    <div className='min-h-screen bg-base-200 transition-colors duration-300' data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductPage />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
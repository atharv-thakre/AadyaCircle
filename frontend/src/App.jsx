import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './Components/public/Landing'
import Login from './Components/public/Login'
import Signup from './Components/public/Signup'
import Dashboard from './Components/Dashbaord/Dashboard'
import About from './Components/public/About'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

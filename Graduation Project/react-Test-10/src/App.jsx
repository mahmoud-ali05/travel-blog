import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Tours from './Pages/Tours/Tours'
import Contact from './Pages/Contact/Contact' // Add missing import
import Cairo from './Pages/Countries/Cairo/Cairo'
import Rome from './Pages/Countries/Roma/Roma'
import Paris from './Pages/Countries/Paris/Paris'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
     
        <Navbar  />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Cairo' element={<Cairo />} />
            <Route path='/Rome' element={<Rome />} />
            <Route path='/Paris' element={<Paris />} />
            <Route path='/Tours' element={<Tours />} />
            <Route path='/Contact' element={<Contact />} />
          </Routes>
       
        <Footer /> 
      
    </>
  )
}

export default App
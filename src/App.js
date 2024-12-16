import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import Home from './Pages/Home'
import './App.css'
import Footer from './component/Footer'

const App = () => {
  return (
   <>
   <BrowserRouter>
   <Navbar />
   <Routes>
     <Route exact path="/" element={<Home/>} />
     {/* <Route exact path="/aboutus" element={<About />} />
     <Route exact path="/contactus" element={<Contact />} /> */}
   </Routes>
   <Footer/>
   </BrowserRouter>
   </>
  )
}

export default App
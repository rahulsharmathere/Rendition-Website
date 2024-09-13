import React from "react"
import {BrowserRouter} from 'react-router-dom';
import {Events, Footer, Fun, Home, Navbar, Teachings, Team} from './components'

function App() {

  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <Navbar/>
        <Home/>
        <Teachings/>
        <Events/>
        {/* <Team/> */}
        <Fun/>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App

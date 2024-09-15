import React, { useEffect, useState } from "react"
import {BrowserRouter} from 'react-router-dom';
import {Events, Footer, Fun, Home, Navbar, Teachings, Team} from './components'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    window.addEventListener('load',()=>{
      setLoading(false);
    })
    // return ()=>(window.removeEventListener('l'))
  },[])

  return (
    <div className="overflow-x-hidden">
      {loading ? <div className='text-7x l flex justify-center items-center bg-black text-white'>Loading....</div> :
      <BrowserRouter>
        <Navbar/>
        <Home/>
        <Teachings/>
        <Events/>
        <Team/>
        <Fun/>
        <Footer/>
      </BrowserRouter>}
    </div>
  )
}

export default App

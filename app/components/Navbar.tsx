import React from 'react'
import { Link } from 'react-router'
function Navbar() {
  return (
    <nav className='resume-nav navbar'>
        <Link to="/">
        <p className='text-2xl  text-gradient !font-extrabold'></p>
        RESUMIND
        </Link>

        <Link to="/upload" className='primary-button w-fit'>
        Upload Resume</Link>



    </nav>
  )
}

export default Navbar

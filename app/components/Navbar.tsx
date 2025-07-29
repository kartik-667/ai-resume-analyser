import React from 'react'
import { Link } from 'react-router'
import { usePuterStore } from '~/lib/puter'
function Navbar() {
  const {auth}=usePuterStore()



   const handleLogout=async ()=>{
  await auth.signOut()
   return

  }
  return (
    <nav className='resume-nav navbar'>
        <Link to="/">
        <p className='text-2xl  text-gradient !font-extrabold'></p>
        RESUMIND
        </Link>

        <div className='flex gap-2'>
        <Link to="/upload" className='primary-button w-fit'>
        Upload Resume</Link>
        {auth.isAuthenticated && (
          <button onClick={handleLogout} className='primary-button w-fit'>Log Out</button>
        )}

        </div>





    </nav>
  )
}

export default Navbar

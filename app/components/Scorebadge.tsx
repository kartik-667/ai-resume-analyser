import React from 'react'

function Scorebadge({score}) {
    const value=score > 70 ? "Strong" :
    score > 49 ? "Good start" : "Needs work"

    const bgcolor=score > 70 ? "bg-green-400" :
    score > 49 ? "bg-yellow-400" : "bg-red-400"

  return (
    <div className=''>
        <h3 className={`shadow-md p-1.5 rounded-2xl bg-gre ${bgcolor}`}>{value}</h3>
        
      
    </div>
  )
}

export default Scorebadge

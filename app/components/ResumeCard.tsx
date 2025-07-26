import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'
import { usePuterStore } from '~/lib/puter'
function ResumeCard({resume}:{resume:Resume}) {
    const {id, jobTitle, companyName, feedback, resumePath, imagePath }=resume
    const {fs}=usePuterStore()
    const [resumeURL, setresumeURL] = useState("")

    useEffect(() => {
      const loadresume=async ()=>{
        const blob=await fs.read(imagePath)
        if(!blob) return
        let url=URL.createObjectURL(blob)
        setresumeURL(url)


      }

      loadresume()
    
      
    }, [imagePath])
    

  return (
    <Link to={`/resume/${id}`}
    className='resume-card animate-in fade-in duration-1000  basis-[32%] max-lg:basis-[48%] max-md:basis-full hover:scale-105'>
        <div className='resume-card-header'>
        <div>
            <h2 className='!text-black font-bold break-words'>{companyName}</h2>
            <h3 className='text-lg text-gray-500 break-words'>{jobTitle}</h3>
        </div>

        <div className='flex-shrink-0'>
        <ScoreCircle score={feedback.overallScore}></ScoreCircle>
        </div>


        </div>

        {resumeURL && (
        <div className='animate-in fade-in duration-1000 gradient-border'>
            <div className='h-full w-full'>
                <img src={resumeURL} alt="resume" className='object-cover object-top w-full h-[350px] overflow-hidden' />
            </div>
        </div>
            
        )}







    </Link>
    
  )
}

export default ResumeCard

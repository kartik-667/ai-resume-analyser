import React from 'react'

function ATS({ats,suggestion}) {
    const atsScore=ats.score
    const bgColor=atsScore > 70 ? "bg-green-100" : atsScore > 49 ? "bg-yellow-100"
    : "bg-red-100"
    
    const imgUrl=atsScore > 70 ? "/icons/ats-good.svg" : atsScore > 49 ? "/icons/ats-warning.svg"
    : "/icons/ats-bad.svg"

    const tipTypeurl={
        good:"/icons/check.svg",
        improve:"/icons/warning.svg",

    }

  return (
    <div className={`${bgColor}  w-full p-2 flex flex-col gap-1 rounded-md shadow-md `}>

      <div className="top flex items-center gap-2">
        <img src={imgUrl} alt="ats-status" />
        <h3 className='text-2xl font-semibold'>ATS Score - {atsScore}/100</h3>

      </div>

      <div className='middle-body flex flex-col'>
        <h3 className='text-lg mb-3'>How well does your resume pass through our Application Tracking System ?</h3>
        <div className='flex flex-col'>
            {suggestion.length>0 ? (
                <div className='flex flex-col gap-1.5 '>
                    {suggestion.map((ele,index)=> (
                        <div className='flex  items-center gap-1 p-1 '>
                            <img src={ele.type==="good" ? tipTypeurl.good : tipTypeurl.improve} alt="" className='h-6 w-6' />
                            <p key={index}>{ele.tip}</p>

                        </div>
                    ))}
                </div>

            ):null}

        </div>
      </div>
    </div>
  )
}

export default ATS

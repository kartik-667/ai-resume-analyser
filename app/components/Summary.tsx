import React from 'react'
import ScoreGauge from './ScoreGauge'
import Scorebadge from './Scorebadge'

function Category({title,score}){

    const textColor= score > 70 ? 'text-green-600' : score > 49 ?"text-yellow-600" : "text-red-600"
    return (
        <div className='resume-summary w-full'>
            <div className='category'>
                <div className='flex gap-2 items-center justify-center'>
                <p className='text-2xl'>{title}</p>
                <Scorebadge score={score}></Scorebadge>
                

                </div>
            <p className='text-2xl'>
                <span className={textColor}>{score}<span className='text-black'>/100</span></span>
            </p>
            </div>
        </div>
    )

}

function Summary({feedback}) {
  return (
    <div className='w-full shadow-md flex 
    flex-col items-center'>
        <div className='flex items-center gap-4 w-full p-4'>
            <ScoreGauge  score={feedback.overallScore}></ScoreGauge>

            <div className='flex flex-col items-center justify-center w-full '>
                <h2>Your Overall Resume Score</h2>
                
            </div>


        </div>

        <Category title="Tone & Style" score={feedback.toneAndStyle.score}></Category>
        <Category title="Content" score={feedback.content.score}></Category>
        <Category title="Structure" score={feedback.structure.score}></Category>
        <Category title="Skills" score={feedback.skills.score}></Category>

      
    </div>
  )
}

export default Summary

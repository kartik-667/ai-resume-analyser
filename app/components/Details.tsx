import React from 'react'
import Accordian from './Accordian'

function Details({feedback}) {
  return (
    <div>
        
      <Accordian title={feedback.content} titlename="Content"></Accordian>
      <Accordian title={feedback.skills} titlename="Skills"></Accordian>
      <Accordian title={feedback.structure} titlename="Structure"></Accordian>
      <Accordian title={feedback.toneAndStyle} titlename="Tone & Style"></Accordian>

    </div>
  )
}

export default Details

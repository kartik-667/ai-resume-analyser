// import React, { useState } from 'react'

// function Accordian({title,titlename}) {
//     const {score,tips}=title
//      const bgcolor=score > 70 ? "bg-green-400" :
//     score > 49 ? "bg-yellow-400" : "bg-red-400"

//     const [expand, setexpand] = useState(false)
//     const svgurl={
//         istrue:"/up.svg",
//         isfalse:"/down.svg"
//     }

//     const handleExpand=()=>{
//         setexpand(!expand)
//     }

//     const tipTypeurl={
//         good:"/icons/check.svg",
//         improve:"/icons/warning.svg",

//     }
    

//   return (
//     <div className='main w-full shadow-md p-2 gap-2 flex flex-col justify-between rounded-md transition fade-in duration-1000'>
//         <div onClick={handleExpand} className="top flex items-center relative cursor-pointer">
//             <div className='left w-[90%] flex '>

//             <h2 className='!text-black'>{titlename} -  </h2>
//             <div className='flex items-center gap-1'>

//             <div className='flex  items-center gap-1'>
//                  <img src={score>70  ? tipTypeurl.good : tipTypeurl.improve} alt="" className='h-6 w-6' />
//              <h3 className={`shadow-md p-2 rounded-2xl bg-gre ${bgcolor}`}>{score}/100</h3>

//             </div>
             
//             </div>
//             </div>
//             <img src={expand ? svgurl.istrue : svgurl.isfalse} alt="up/down" className='h-6 w-6 right-0 relative ' />
//         </div>
        
//         {expand && (
//             <>
//         <div className="tips-section mt-2 flex flex-col w-full">
//             {tips.map((ele,index)=>(
//                 <div key={index} className='flex  items-center gap-2 w-full  '>
//                  <img src={ele.type=="good"  ? tipTypeurl.good : tipTypeurl.improve} alt="status" className='h-6 w-6' />
//                  <p className='text-lg'>{ele.tip}</p>

             
//             </div>


//             ))}
//         </div>

//         <div className="tip-desc mt-2 flex flex-col w-full gap-2">
//             {tips.map((ele,index)=>(
//                 <div key={index} className='flex gap-2  rounded-md'>
                    
//                     <p className={`text-lg ${ele.type==="good" ? "bg-green-100" : "bg-yellow-100"} rounded-2xl p-2 `}>{ele.explanation}</p>
//                 </div>
//             ))}
//         </div>
            
//             </>

//         )}
      
//     </div>
//   )
// }

// export default Accordian
import React, { useState, useRef, useEffect } from 'react'; // Import useRef and useEffect

function Accordian({ title, titlename }) {
    const { score, tips } = title;

    const bgcolor = score > 70 ? "bg-green-400" :
        score > 49 ? "bg-yellow-400" : "bg-red-400";

    const [expand, setExpand] = useState(false); // Changed to camelCase for consistency
    const contentRef = useRef(null); // Create a ref to measure content height

    const svgurl = {
        istrue: "/up.svg", // Assuming icons are in public/icons/
        isfalse: "/down.svg" // Assuming icons are in public/icons/
    };

    const handleExpand = () => {
        setExpand(!expand);
    };

    const tipTypeurl = {
        good: "/icons/check.svg",
        improve: "/icons/warning.svg",
    };

    // Calculate the height for the transition (optional, but makes it more precise)
    // You might not need this if 'max-h-screen' is sufficient for your content.
    // However, for more control, especially if content is dynamic, this helps.
    // For simplicity, we'll mostly rely on max-h-screen/0 for this example.

    return (
        <div className='main w-full shadow-md p-2 gap-2 flex flex-col justify-between rounded-md overflow-hidden'> {/* Add overflow-hidden to the main container */}
            <div onClick={handleExpand} className="top flex items-center justify-between cursor-pointer py-2"> {/* Added justify-between, py-2 for spacing */}
                <div className='flex items-center gap-2'> {/* This div groups the title and score */}
                    <h2 className='!text-black text-xl font-semibold'>{titlename} - </h2>
                    <div className='flex items-center gap-1'>
                        {/* <img
                            src={score > 70 ? tipTypeurl.good : tipTypeurl.improve}
                            alt={score > 70 ? "Good score" : "Needs improvement"} // Add descriptive alt text
                            className='h-6 w-6'
                        /> */}
                        <h3 className={`shadow-md p-2 rounded-2xl ${bgcolor} text-white`}>{score}/100</h3> {/* Added text-white for contrast */}
                    </div>
                </div>
                {/* Expand/Collapse Icon */}
                <img
                    src={expand ? svgurl.istrue : svgurl.isfalse}
                    alt={expand ? "Collapse" : "Expand"} // More descriptive alt text
                    className='h-6 w-6 transition-transform duration-300' // Apply transition to transform
                     // Rotate on expand
                />
            </div>

            {/* Content Section - Applying Transition Classes */}
            <div
                ref={contentRef} // Attach ref here if you plan to dynamically calculate height
                className={`
                    transition-all duration-300 ease-in-out overflow-hidden
                    ${expand ? 'max-h-screen opacity-100 pb-2' : 'max-h-0 opacity-0'}
                `}
            >
                <div className="tips-section mt-2 flex flex-col w-full">
                    {tips.length > 0 ? ( // Check if tips exist before mapping
                        tips.map((ele, index) => (
                            <div key={index} className='flex items-center gap-2 w-full'>
                                <img
                                    src={ele.type === "good" ? tipTypeurl.good : tipTypeurl.improve}
                                    alt={ele.type === "good" ? "Good tip" : "Improvement tip"}
                                    className='h-6 w-6'
                                />
                                <p className='text-lg'>{ele.tip}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No specific tips available.</p>
                    )}
                </div>

                <div className="tip-desc mt-2 flex flex-col w-full gap-2">
                    {tips.length > 0 ? ( // Check if tips exist before mapping
                        tips.map((ele, index) => (
                            <div key={index} className='flex gap-2 rounded-md'>
                                <p className={`text-lg ${ele.type === "good" ? "bg-green-100" : "bg-yellow-100"} rounded-2xl p-2 w-full`}>{ele.explanation}</p> {/* Added w-full */}
                            </div>
                        ))
                    ) : (
                        // This else block is less likely to be hit if tips is empty above, but good for consistency
                        <p className="text-gray-600"></p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Accordian;
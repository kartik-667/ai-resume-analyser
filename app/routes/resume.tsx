import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import ATS from '~/components/ATS'
import Details from '~/components/Details'
import Summary from '~/components/Summary'
import { usePuterStore } from '~/lib/puter'
export const meta=()=>{
    return [
         { title: "Resumind | Review" },
    { name: "description", content: "Review of analysed Resume" },

    ]

}


function resume() {
    const {id}=useParams()
    const {auth,isLoading ,kv, fs}=usePuterStore()

    const navigate=useNavigate()

    const [resumeUrl, setresumeUrl] = useState("")
    const [feedback, setfeedback] = useState("")
    const [imageUrl, setimageUrl] = useState("")

    

    async function getUUIDdata(uuid:any){
        if(!id) return
        try {
            // await kv.set("1234","this is test data only")
            const res_data=await kv.get(`resume:${uuid}`)
            let rdata=null

            if(typeof res_data === "string"){
                rdata=JSON.parse(res_data) //string hai thats why we parse to get object
            }else{
                rdata=res_data

            }

            if(!rdata) return

            const resumeBlob=await fs.read(rdata.resumePath)

            if(!resumeBlob) return

            const pdfBlob=new Blob([resumeBlob],{type:"application/pdf"})

            const resumeUrl=URL.createObjectURL(pdfBlob)

            setresumeUrl(resumeUrl)

            const imageBlob=await fs.read(rdata.imagePath)

            if(!imageBlob) return

            const imageUrl=URL.createObjectURL(imageBlob)

            setimageUrl(imageUrl)

            setfeedback(rdata.feedback)

            







            
        } catch (error) {
            console.log("some error occured getting data");
            
            
        }


    }

    useEffect(()=>{
        getUUIDdata(id)
        

        
    },[id]) //on page load, get the feedback data using uuid 

    useEffect(()=>{
        if(feedback) console.log(feedback);
        

    },[feedback])

    useEffect(() => {
    if(!isLoading &&  !auth.isAuthenticated){
      //not signed in
      navigate(`/auth?next=/resume/${id}`)
    }
  
    
  }, [auth.isAuthenticated,navigate,isLoading])


  return (
    <main className='!pt-0'>
        <nav className='resume-nav'>
            <Link to="/" className='back-button'>
            <img src="/icons/back.svg" alt="back-button" className='h-2.5 w-2.5' />
            <span className='text-gray-500'>Back to Homepage</span>
            </Link>
        </nav>

        <div className='flex flex-row w-full  max-lg:flex-col-reverse'>
            <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
                {imageUrl && resumeUrl && (
                    <div className='animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit'>
                        <a href={resumeUrl} target='_blank'>
                            <img src={imageUrl} alt="resume-photo" className='max-w-full h-auto object-contain' />

                        </a>


                    </div>
                )}


            </section>

            {/* section for feedback */}
            <section className='feedback-section'>
                <h2 className='text-4xl font-bold !text-black'>Resume review</h2>
                {feedback ? (
                    <div className='flex flex-col gap-8 animate-in duration-1000 fade-in'>
                        
                        <Summary feedback={feedback}></Summary>
                        <ATS ats={feedback.ATS} suggestion={feedback.ATS.tips} ></ATS>
                        <Details details={feedback}></Details>

                    </div>
                    

                ):(
                    <img src="/images/resume-scan-2.gif" alt="scan-image"   />

                )}
            </section>

        </div>

    </main>
  )
}

export default resume

import { prepareInstructions } from 'constants'
import React, { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import FileUploader from '~/components/FileUploader'
import Navbar from '~/components/Navbar'
import { convertPdfToImage } from '~/lib/pdf2img'
import { usePuterStore } from '~/lib/puter'
import { generateUUID } from '~/lib/utils'

function upload() {
    const {fs, kv,auth, isLoading, ai }=usePuterStore()
    const [isProcessing, setisProcessing] = useState(false)
    const [status, setstatus] = useState("")
    const [file, setfile] = useState<File | null>(null)
    const navigate=useNavigate()

    const handleFileSelect=(file : File | null)=>{
        setfile(file)

    }


    function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        const form=document.querySelector("#form")
        if(!form) return
        const formData=new FormData(form)
        const companyName=formData.get("company-name") as string
        const jobDesc=formData.get("job-title") as string
        const jobTitle=formData.get("job-desc") as string

        console.log({
            file,companyName,jobDesc,jobTitle
        });

        const res=handleAnalyse({companyName,jobDesc,jobTitle})
            



        
        


    }

    async function handleAnalyse({companyName,jobDesc,jobTitle}:{
        companyName:string,jobDesc:string, jobTitle:string
    }){
        if(!file){
            setstatus("No file selected")
            setisProcessing(false)
            return;
        }

        setisProcessing(true)
        setstatus("Uploading the file...")

        const uploadedFile=await fs.upload([file])

        if(!uploadedFile){
            setstatus("Error: Failed to upload file")
        }

        setstatus("Converting to image ")
        const imageFile=await convertPdfToImage(file)
        
        if(!imageFile){
            setstatus("Failed to convert PDF to image")
        } 
        
        
        setstatus("Uploading the image ")
        const uploadedImage=await fs.upload([imageFile.file])
        

        if(!uploadedImage) setstatus("Failed to upload image")

        setstatus("Preparing the data")

        const uuid=generateUUID()
        

        //now data
        const data={
            uuid,
            resumePath:uploadedFile.path,
            imagePath:uploadedImage.path,
            companyName,jobDesc,jobTitle,
            feedback:""
        }

        await kv.set(`resume:${uuid}`,JSON.stringify(data)) 

        setstatus("Analysing...")

        const feedback=await ai.feedback(uploadedFile?.path,
            prepareInstructions({jobTitle, jobDesc})
        )

        if(!feedback) setstatus("Failed to analyse resume")

        const feedbackText=typeof feedback?.message.content === "string" ? feedback?.message.content :
        feedback?.message.content[0].text

        data.feedback=JSON.parse(feedbackText)

        await kv.set(`resume:${uuid}`,JSON.stringify(data))

        setstatus("Analysis complete, redirecting...")
        console.log(data);
        








    }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar></Navbar>

    <section className="main-section">
        <div className='page-heading'>
            <h1>Smart feedback for your dream job</h1>
            {isProcessing ? (
                <>
                    <h2>{status}</h2>
                    <img className='w-full' src="/images/resume-scan.gif" alt="processing.." />
                </>
            ) : (
                <h2>Drop your resume for ATS Score and improvement tips</h2>

            )}

            {!isProcessing && (
                <form onSubmit={(e)=> handleSubmit(e)} id="form">
                    <div className="form-div">
                    <label htmlFor="company-name">Company name</label>
                    <input type="text" name="company-name" id="company-name" />

                    </div>
                     <div className="form-div">

                    <label htmlFor="job-title">Job Title</label>
                    <input type="text" name="job-title" id="job-title" />

                     </div>
                     <div className="form-div">
                    <label htmlFor="job-desc">Job Description</label>
                    <textarea rows={5} name="job-desc" id="job-desc"></textarea>

                     </div>

                      <div className="form-div">
                        <label htmlFor="uploader">Upload Resume</label>
                        {/* <input type="file" name="uploader" id="uploader" className='cursor-pointer'/> */}
                        <FileUploader onFileSelect={handleFileSelect} />
                      </div>

                    <button className='primary-button' type="submit">Analyse Resume</button>


                </form>
            )}

        </div>
    </section>

    </main>
   
  )
}

export default upload

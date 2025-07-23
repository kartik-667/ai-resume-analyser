import React, { useState, type FormEvent } from 'react'
import FileUploader from '~/components/FileUploader'
import Navbar from '~/components/Navbar'

function upload() {
    const [isProcessing, setisProcessing] = useState(false)
    const [status, setstatus] = useState("")
    const [file, setfile] = useState<File | null>(null)

    const handleFileSelect=(file : File | null)=>{
        setfile(file)

    }


    function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        const form=document.querySelector("#form")
        if(!form) return
        const formData=new FormData(form)
        const companyName=formData.get("company-name")
        const jobDesc=formData.get("job-title")
        const jobTitle=formData.get("job-desc")

        console.log({
            file,companyName,jobDesc,jobTitle
        });
        


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

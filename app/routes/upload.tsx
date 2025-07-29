// import { prepareInstructions } from 'constants'
// import React, { useState, type FormEvent } from 'react'
// import { useNavigate } from 'react-router'
// import FileUploader from '~/components/FileUploader'
// import Navbar from '~/components/Navbar'
// import { convertPdfToImage } from '~/lib/pdf2img'
// import { usePuterStore } from '~/lib/puter'
// import { generateUUID } from '~/lib/utils'

// function upload() {
//     const {fs, kv,auth, isLoading, ai }=usePuterStore()
//     const [isProcessing, setisProcessing] = useState(false)
//     const [status, setstatus] = useState("")
//     const [file, setfile] = useState<File | null>(null)
//     const navigate=useNavigate()

//     const handleFileSelect=(file : File | null)=>{
//         setfile(file)

//     }


//     async function handleSubmit(e:FormEvent<HTMLFormElement>){
//         e.preventDefault()
//         const form=document.querySelector("#form")
//         if(!form) return
//         const formData=new FormData(form)
//         const companyName=formData.get("company-name") as string
//         const jobDesc=formData.get("job-desc") as string
//         const jobTitle=formData.get("job-title") as string

//         console.log({
//             file,companyName,jobDesc,jobTitle
//         });

//         await handleAnalyse({companyName,jobDesc,jobTitle})
            



        
        


//     }

//     async function handleAnalyse({companyName,jobDesc,jobTitle}:{
//         companyName:string,jobDesc:string, jobTitle:string
//     }){
//         if(!file){
//             setstatus("No file selected")
//             setisProcessing(false)
//             return;
//         }

//         setisProcessing(true)
//         setstatus("Uploading the file...")

//         const uploadedFile=await fs.upload([file])

//         if(!uploadedFile){
//             setstatus("Error: Failed to upload file")
//         }

//         setstatus("Converting to image ")
//         const imageFile=await convertPdfToImage(file)
        
//         if(!imageFile){
//             setstatus("Failed to convert PDF to image")
//         } 
        
        
//         setstatus("Uploading the image ")
//         const uploadedImage=await fs.upload([imageFile.file])
        

//         if(!uploadedImage) setstatus("Failed to upload image")

//         setstatus("Preparing the data")

//         const uuid=generateUUID()
        

//         //now data
//         const data={
//             uuid,
//             resumePath:uploadedFile.path,
//             imagePath:uploadedImage.path,
//             companyName,jobDesc,jobTitle,
//             feedback:""
//         }

//         await kv.set(`resume:${uuid}`,JSON.stringify(data)) 

//         setstatus("Analysing...")

//         const feedback=await ai.feedback(uploadedFile?.path,
//             prepareInstructions({jobTitle, jobDesc})
//         )

//         if(!feedback) setstatus("Failed to analyse resume")

//         const feedbackText=typeof feedback?.message.content === "string" ? feedback?.message.content :
//         feedback?.message.content[0].text

//         data.feedback=JSON.parse(feedbackText)

//         await kv.set(`resume:${uuid}`,JSON.stringify(data))

//         setstatus("Analysis complete, redirecting...")
//         console.log(data);

//         navigate(`/resume/${uuid}`)
        








//     }

//   return (
//     <main className="bg-[url('/images/bg-main.svg')] bg-cover">
//     <Navbar></Navbar>

//     <section className="main-section">
//         <div className='page-heading'>
//             <h1>Smart feedback for your dream job</h1>
//             {isProcessing ? (
//                 <>
//                     <h2>{status}</h2>
//                     <img className='w-full' src="/images/resume-scan.gif" alt="processing.." />
//                 </>
//             ) : (
//                 <h2>Drop your resume for ATS Score and improvement tips</h2>

//             )}

//             {!isProcessing && (
//                 <form onSubmit={(e)=> handleSubmit(e)} id="form">
//                     <div className="form-div">
//                     <label htmlFor="company-name">Company name</label>
//                     <input type="text" name="company-name" id="company-name" />

//                     </div>
//                      <div className="form-div">

//                     <label htmlFor="job-title">Job Title</label>
//                     <input type="text" name="job-title" id="job-title" />

//                      </div>
//                      <div className="form-div">
//                     <label htmlFor="job-desc">Job Description</label>
//                     <textarea rows={5} name="job-desc" id="job-desc"></textarea>

//                      </div>

//                       <div className="form-div">
//                         <label htmlFor="uploader">Upload Resume</label>
//                         {/* <input type="file" name="uploader" id="uploader" className='cursor-pointer'/> */}
//                         <FileUploader onFileSelect={handleFileSelect} />
//                       </div>

//                     <button className='primary-button' type="submit">Analyse Resume</button>


//                 </form>
//             )}

//         </div>
//     </section>

//     </main>
   
//   )
// }

// export default upload
import { prepareInstructions } from 'constants'
import React, { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import FileUploader from '~/components/FileUploader'
import Navbar from '~/components/Navbar'
import { convertPdfToImage } from '~/lib/pdf2img'
import { usePuterStore } from '~/lib/puter'
import { generateUUID } from '~/lib/utils'

function Upload() {
  const { fs, kv, auth, isLoading, ai } = usePuterStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const navigate = useNavigate()

  const handleFileSelect = (file: File | null) => {
    setFile(file)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = document.querySelector('#form') as HTMLFormElement
    if (!form) return

    const formData = new FormData(form)
    const companyName = formData.get('company-name') as string
    const jobDesc = formData.get('job-desc') as string
    const jobTitle = formData.get('job-title') as string

    console.log({
      file,
      companyName,
      jobDesc,
      jobTitle,
      auth
    })

    await handleAnalyse({ companyName, jobDesc, jobTitle })
  }

  async function handleAnalyse({
    companyName,
    jobDesc,
    jobTitle
  }: {
    companyName: string
    jobDesc: string
    jobTitle: string
  }) {
    if (!file) {
      setStatus('No file selected')
      setIsProcessing(false)
      return
    }

    setIsProcessing(true)
    setStatus('Uploading the file...')
    const uploadedFile = await fs.upload([file])
    if (!uploadedFile) {
      setStatus('Error: Failed to upload file')
      setIsProcessing(false)
      return
    }

    setStatus('Converting PDF to image...')
    const imageFile = await convertPdfToImage(file)
    if (!imageFile) {
      setStatus('Failed to convert PDF to image')
      setIsProcessing(false)
      return
    }

    setStatus('Uploading the image...')
    const uploadedImage = await fs.upload([imageFile.file])
    if (!uploadedImage) {
      setStatus('Failed to upload image')
      setIsProcessing(false)
      return
    }

    setStatus('Preparing data...')
    const uuid = generateUUID()

    const data = {
      uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobDesc,
      jobTitle,
      feedback: ''
    }

    await kv.set(`resume:${uuid}`, JSON.stringify(data))

    setStatus('Analyzing resume...')
    let feedback: any
    try {
      feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDesc })
      )
    } catch (err) {
      console.error('AI Feedback error:', err)
      setStatus('Failed to analyze resume. Permission denied or quota exceeded.')
      setIsProcessing(false)
      return
    }

    if (!feedback) {
      setStatus('Failed to get feedback from AI')
      setIsProcessing(false)
      return
    }

    const feedbackText =
      typeof feedback.message.content === 'string'
        ? feedback.message.content
        : feedback.message.content[0]?.text ?? ''

    try {
      data.feedback = JSON.parse(feedbackText)
    } catch (err) {
      console.error('Error parsing feedback:', err)
      setStatus('Failed to parse AI feedback')
      setIsProcessing(false)
      return
    }

    await kv.set(`resume:${uuid}`, JSON.stringify(data))

    setStatus('Analysis complete. Redirecting...')
    console.log(data)
    navigate(`/resume/${uuid}`)
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{status}</h2>
              <img className="w-full" src="/images/resume-scan.gif" alt="processing..." />
            </>
          ) : (
            <h2>Drop your resume for ATS Score and improvement tips</h2>
          )}

          {!isProcessing && (
            <form onSubmit={handleSubmit} id="form">
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
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                Analyse Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default Upload

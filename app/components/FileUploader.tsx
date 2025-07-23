import type { P } from 'node_modules/react-router/dist/development/route-data-DjzmHYNR.mjs'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

function FileUploader({onFileSelect}) {

    const [file, setfile] = useState("")

    const handleCancel=(e)=>{
        e.stopPropagation()
        setfile(null)
        onFileSelect(null)
    }

    const onDrop = useCallback((acceptedFiles : File[]) => {
    // Do something with the files
    const file=acceptedFiles[0]
    if(file){
        onFileSelect(file)
        setfile(file)
    }
  }, [onFileSelect])

  



  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (

    <div className='gradient-border w-full'>

     <div {...getRootProps()} className='cursor-pointer'>
      <input {...getInputProps()} />

      <div className='space-y-4'>
        
        {file ? (
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col justify-center items-center gap-1 w-[95%]'>
                <img src="/pdf.svg" alt="file" className='h-14 w-14' />
                <p>{file.name}</p>


            </div>
            <div className=' flex flex-row justify-center items-center pr-1 '>
                <button className=' cursor-pointer' onClick={handleCancel}>
                <img src="/icons/cross.svg" alt="cross" className='h-5 w-5 ' />
            
            </button>

            </div>

            </div>

        ) : (
            <div>
                <div className='justify-center flex'>
            <img src="/icons/info.svg" alt=""  />
        </div>
                <p className='text-lg text-gray-500 font-semibold'>Click to upload file</p>
                <p className='text-lg text-gray-500 font-semibold'>or Drag & Drop</p>
            </div>
        )}

      </div>



      
    </div>

    </div>
  )
}

export default FileUploader

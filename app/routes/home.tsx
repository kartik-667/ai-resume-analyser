import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants/index";
import { usePuterStore } from "~/lib/puter";
import { replace, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyser" },
    { name: "description", content: "Analyse your resume for Free !" },
  ];
}

export default function Home() {
  const {auth, isLoading, kv}=usePuterStore()
  const navigate=useNavigate()
  const [allResumes, setallResumes] = useState([])
  const [isloading, setisloading] = useState(false)

  useEffect(() => {
    if(!isLoading &&  !auth.isAuthenticated){
      //not signed in
      navigate("/auth?next=/")
    }
  
    
  }, [auth.isAuthenticated,navigate,isLoading])

  //fetching all stored resumes
  useEffect(()=>{
    
    const loadResumes=async ()=>{
      setisloading(true)
      const resumes=await kv.list('resume:*',true)
      const parsedResumes=resumes?.map((resume)=>{
        return JSON.parse(resume.value)
      })

      setallResumes(parsedResumes)
      console.log(parsedResumes);
      
      setisloading(false)

    }


    loadResumes()


  },[])
  


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar></Navbar>

    <section className="main-section">
      <div className="page-heading">
        <h1>Track your application & Resume Ratings </h1>
        <h2>Review your submissions and check AI Powered Feedback</h2>
      </div>

      {isloading && (
        <h1>Loading...</h1>
      )}

      {!isloading && allResumes.length >0 && (
        <div className="resumes-section">
        {allResumes.map((resume)=> (
          <ResumeCard key={resume.uuid} resume={resume} />
        ))}

      </div>

      )}

      {!isloading && allResumes.length === 0 && (
    <p className="text-gray-600 text-center mt-8">No resumes found. Upload one to get started!</p>
)}

    {/* {resumes.length>0 && (
      
    )} */}
    </section>





  </main>
}

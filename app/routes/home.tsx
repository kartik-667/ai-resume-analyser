import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants/index";
import { usePuterStore } from "~/lib/puter";
import { replace, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyser" },
    { name: "description", content: "Analyse your resume for Free !" },
  ];
}

export default function Home() {
  const {auth, isLoading}=usePuterStore()
  const navigate=useNavigate()

  useEffect(() => {
    if(!isLoading &&  !auth.isAuthenticated){
      //not signed in
      navigate("/auth?next=/",{replace:true})
    }
  
    
  }, [auth.isAuthenticated,navigate,isLoading])
  


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar></Navbar>

    <section className="main-section">
      <div className="page-heading">
        <h1>Track your application & Resume Ratings </h1>
        <h2>Review your submissions and check AI Powered Feedback</h2>
      </div>
    {resumes.length>0 && (
      <div className="resumes-section">
        {resumes.map((resume)=> (
          <ResumeCard key={resume.id} resume={resume} />
        ))}

      </div>
    )}
    </section>






  </main>
}

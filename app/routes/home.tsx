import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "constants";
import ResumeCard from "~/components/ResumeCard";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyser" },
    { name: "description", content: "Analyse your resume for Free !" },
  ];
}

export default function Home() {
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

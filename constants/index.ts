//this contain dummy data 



export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
  id: "4",
  companyName: "Amazon",
  jobTitle: "Backend Developer",
  imagePath: "/images/resume_02.png",
  resumePath: "/resumes/resume-4.pdf",
  feedback: {
    overallScore: 68,
    ATS: {
      score: 85,
      tips: [],
    },
    toneAndStyle: {
      score: 70,
      tips: [],
    },
    content: {
      score: 65,
      tips: [],
    },
    structure: {
      score: 70,
      tips: [],
    },
    skills: {
      score: 75,
      tips: [],
    },
  },
},
{
  id: "5",
  companyName: "Meta",
  jobTitle: "Full Stack Developer",
  imagePath: "/images/resume_03.png",
  resumePath: "/resumes/resume-5.pdf",
  feedback: {
    overallScore: 80,
    ATS: {
      score: 88,
      tips: [],
    },
    toneAndStyle: {
      score: 85,
      tips: [],
    },
    content: {
      score: 78,
      tips: [],
    },
    structure: {
      score: 80,
      tips: [],
    },
    skills: {
      score: 82,
      tips: [],
    },
  },
},
{
  id: "6",
  companyName: "Tesla",
  jobTitle: "Data Scientist",
  imagePath: "/images/resume_01.png",
  resumePath: "/resumes/resume-6.pdf",
  feedback: {
    overallScore: 73,
    ATS: {
      score: 80,
      tips: [],
    },
    toneAndStyle: {
      score: 75,
      tips: [],
    },
    content: {
      score: 70,
      tips: [],
    },
    structure: {
      score: 72,
      tips: [],
    },
    skills: {
      score: 75,
      tips: [],
    },
  },
},
{
  id: "7",
  companyName: "Netflix",
  jobTitle: "DevOps Engineer",
  imagePath: "/images/resume_01.png",
  resumePath: "/resumes/resume-7.pdf",
  feedback: {
    overallScore: 79,
    ATS: {
      score: 84,
      tips: [],
    },
    toneAndStyle: {
      score: 80,
      tips: [],
    },
    content: {
      score: 78,
      tips: [],
    },
    structure: {
      score: 77,
      tips: [],
    },
    skills: {
      score: 76,
      tips: [],
    },
  },
},
{
  id: "8",
  companyName: "Adobe",
  jobTitle: "UI/UX Designer",
  imagePath: "/images/resume_01.png",
  resumePath: "/resumes/resume-8.pdf",
  feedback: {
    overallScore: 82,
    ATS: {
      score: 87,
      tips: [],
    },
    toneAndStyle: {
      score: 85,
      tips: [],
    },
    content: {
      score: 80,
      tips: [],
    },
    structure: {
      score: 83,
      tips: [],
    },
    skills: {
      score: 84,
      tips: [],
    },
  },
},
{
  id: "9",
  companyName: "IBM",
  jobTitle: "Machine Learning Engineer",
  imagePath: "/images/resume_01.png",
  resumePath: "/resumes/resume-9.pdf",
  feedback: {
    overallScore: 77,
    ATS: {
      score: 82,
      tips: [],
    },
    toneAndStyle: {
      score: 78,
      tips: [],
    },
    content: {
      score: 76,
      tips: [],
    },
    structure: {
      score: 77,
      tips: [],
    },
    skills: {
      score: 79,
      tips: [],
    },
  },
},
{
  id: "10",
  companyName: "OpenAI",
  jobTitle: "AI Research Intern",
  imagePath: "/images/resume_01.png",
  resumePath: "/resumes/resume-10.pdf",
  feedback: {
    overallScore: 88,
    ATS: {
      score: 92,
      tips: [],
    },
    toneAndStyle: {
      score: 90,
      tips: [],
    },
    content: {
      score: 87,
      tips: [],
    },
    structure: {
      score: 85,
      tips: [],
    },
    skills: {
      score: 89,
      tips: [],
    },
  },
},

];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat,
}: {
  jobTitle: string;
  jobDescription: string;
  AIResponseFormat: string;
}) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.`;
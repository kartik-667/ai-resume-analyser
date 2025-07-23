import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { usePuterStore } from '~/lib/puter'

export const meta=()=>{
    return [
         { title: "Resumind | Auth" },
    { name: "description", content: "Log into your account !" },

    ]

}

function Auth() {
    const {isLoading, auth}=usePuterStore()
    const navigate=useNavigate()
    const location=useLocation()
    const params= new URLSearchParams(location.search)
    // const next=location.search.split('next=')[1]
    const next=params.get("next")


    useEffect(()=>{
        if(auth.isAuthenticated) navigate(next)

    },[auth.isAuthenticated,next])
    
    
  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center" >
        <div className='gradient-border shadow-lg'>
            <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
                <div className='flex flex-col gap-2 items-center text-center'>
                    <h1>Welcome</h1>
                    <h2>Log In to Continue your Journey</h2>
                </div>
                <div>
                    {isLoading ? (
                        <button className='auth-button animate-pulse'>
                            <p>Signing you in...</p>
                        </button>

                    ) : <>
                        {auth.isAuthenticated ? (
                            <button onClick={auth.signOut} className='auth-button'>Log Out</button>
                        ): (
                             <button onClick={auth.signIn} className='auth-button'>Log In</button>
                        ) }
                    </>}
                </div>

            </section>
        </div>


    </main>
  )
}

export default Auth

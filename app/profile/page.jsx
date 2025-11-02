'use client'
import Loading from '@components/loading'
import Profile from '@components/Profile'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import React, { Suspense, useEffect, useState } from 'react'


const profile = () => {
  const {data:session}=useSession()
 
  const router=useRouter()
  if(!session?.user?.id){
    router.push('/')
  }
  const [posts, setposts] = useState([])
  useEffect(()=>{
    const fet=async () => {
      const a=await fetch(`/api/profile/${session?.user.id}/posts`)
      const j=await a.json()
      setposts(j)
    };
    if(session?.user.id)fet()
  },[session?.user.id])

  const eP=(post)=>{
    router.push(`/updatepost?id=${post._id}`)
  }

  const dP=async (post) => {
    const f=confirm("Delete this post?")
    if(f)try {
     await fetch(`/api/post/${post._id}`,{
      method:"DELETE"
     })
     const z=posts.filter((x)=>x._id!==post._id) 
     setposts(z)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    
    <div>
    <h1 className='text-center text-2xl pb-5'>My profile</h1>
    <Suspense fallback={Loading()}>
    <Profile
    data={posts}
    edit={eP}
    del={dP}
    /></Suspense>
    </div>
    
  )
}

export default profile
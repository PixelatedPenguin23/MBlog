'use client'
import Form from '@components/Form'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Create = () => {
  const router=useRouter()
  
  const [posts, setposts] = useState({post:"",tag:""})
  const [submitting, setsubmitting] = useState(false)
  const {data:session}=useSession()
  if(!session?.user?.id){
    router.push('/')
  }
  
  const handleS=async(e)=>{
    
    e.preventDefault()
    
    
    setsubmitting(true)
    try {
      const d=await fetch('/api/post/new',{
        method:"POST",
        body:JSON.stringify({
          post:posts.post,
          tag:posts.tag,
          userId:session?.user?.id
        })
      })
      if(d.ok){router.push('/')}
    } catch (error) {
      console.log(error)
    }
    finally{setsubmitting(false)}
  }

  return (
    
      <Form
      type="Create"
      submitting={submitting}
      handle={handleS}
      setposts={setposts}
      posts={posts}
      />
    
  )
}

export default Create
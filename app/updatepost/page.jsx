"use client"
import Form from '@components/Form'
import { useSession } from 'next-auth/react'

import { useRouter, useSearchParams } from 'next/navigation'

import React, {  useEffect, useState } from 'react'

const update = () => {
  const {data:session}=useSession()
  
  const sp=useSearchParams()
  const uID=sp.get('id')
  
  const router=useRouter()
  if(!session?.user?.id){
    router.push('/')
  }
  
  const [posts, setposts] = useState({post:"",tag:""})

  useEffect(()=>{
    const g=async () => {
      const a=await fetch(`/api/post/${uID}`)
      const f= await a.json()
      setposts({
        post:f.post,
        tag:f.tag
      })
    }
    if(uID)g()
  },[uID])

  const [submitting, setsubmitting] = useState(false)
  const handleE=async(e)=>{
    e.preventDefault()
    setsubmitting(true)
    try {
      const d=await fetch(`/api/post/${uID}`,{
        method:"PATCH",
        body:JSON.stringify({
          post:posts.post,
          tag:posts.tag,
          
        })
      })
      if(d.ok){router.push('/')}
    } catch (error) {
      console.log(error)
    }
    finally{setsubmitting(false)}
  }
  console.log(posts.post,posts)
  
  return (
    
      <Form
      type="Edit"
      submitting={submitting}
      handle={handleE}
      setposts={setposts}
      posts={posts}
      />
   
  )
}

export default update
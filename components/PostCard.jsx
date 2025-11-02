'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const PostCard = ({post,edit,del}) => {
  const path=usePathname()
  const {data:session}=useSession()
  const [copied, setcopied] = useState("")
  const handleC=()=>{
    setcopied(post.post)
    navigator.clipboard.writeText(post.post)
    setTimeout(()=>setcopied(false),3000)
  }  

  return (
    <section className='flex flex-col bg-slate-700 rounded-xl p-5 '>
        <div className='flex flex-row justify-between gap-8 w-full'>
        <div className='flex flex-row  gap-3 w-full'>
          <div className='flex items-center'>
          <Image className='rounded-full' src={post.creator.image} width={40} height={40} alt='k'/>
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between'>
            <p className=''>{post.creator.username}</p>
            <div className='items-center flex cursor-pointer ' onClick={handleC}>
            <Image className='' height={17} width={17} alt='copy'
              src={copied?'/assets/icons/tick.svg':'/assets/icons/copy.svg'}/>
            </div>
            </div>
            <p className='text-xs text-slate-400'>{post.creator.email}</p>
            
          </div>
        </div>
            
        </div>
        <div className=' bg-slate-800 rounded-md mt-4 p-2 w-full h-full'>
          <p className='break-words'>{post.post}</p>
          <p className='text-sm opacity-30 break-words'>{post.tag}</p>
        </div>
        
        <div>
          {post.creator._id===session?.user.id&& path==='/profile'&&
          <div className='flex flex-row justify-between mt-4 items-center my-auto'>
            <p onClick={edit} className='bg-green-700 text-sm text-white rounded-full p-1.5 cursor-pointer'>Edit Post</p>
            <p onClick={del} className='bg-red-800 text-white rounded-full p-1.5 cursor-pointer text-sm'>Delete</p>
            
            </div>}
        </div>
    </section>
  )
}

export default PostCard
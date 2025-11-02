import Link from 'next/link'
import React from 'react'

const Form = ({type,submitting,handle,posts,setposts}) => {
  return (
    <section className='flex flex-col text-center items-center'>
      <h1 className='text-4xl'>{type} Post</h1>
      <p className='text-xs opacity-25'>All you can think of</p>

      <form onSubmit={handle} className='flex flex-col'>
        
        <label className='flex flex-col mt-10  items-center'>
          <h2 className=' text-xl'>{type} Your Post</h2>
          <textarea required placeholder='Write your post here...' value={posts.post} onChange={(e)=>setposts({...posts,post:e.target.value})} className='rounded-2xl w-56 h-72 p-3 bg-blue-950 text-center mt-2'/>
        </label>


        <label className='mt-5  items-center'>
          <h2>Your Tags <span className='opacity-20'>(#AI, #ComputerScience)</span></h2>
          <input required value={posts.tag} placeholder='write tags here' onChange={(e)=>setposts({...posts,tag:e.target.value})} className='rounded-2xl w-56 h-10 p-3 bg-blue-950 text-center mt-2'/>
        </label>
        
        <div className='mt-7 flex flex-row justify-between'>
          <Link className='bg-red-500 text-black p-1.5 rounded-full' href='/'>Cancel</Link>
          <button disabled={submitting} type='submit' className='bg-green-500 px-7 text-black p-1.5 rounded-full'>
            {submitting?`${type}ing...`:type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
'use client'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const Nav = () => {
  const [providers,setProviders]=useState(null)
  const {data:session}=useSession()
  useEffect(()=>{
    (async()=>{
      const z=await getProviders()
      setProviders(z)
    })()
    
  },[session?.user])
  
  return (
    <nav className='top-0 flex flex-row justify-between fixed max-md:px-1 pt-1 md:px-20 px-5 w-full items-center backdrop-filter backdrop-blur-3xl h-14 opacity-100 z-10 ' >
      <Link href='/' className='flex flex-row items-center my-auto'>
      <Image src='/assets/images/ll.svg' width={50} height={50} alt='logo' className='max-md:hidden'/>
      <Image src='/assets/images/ll.svg' width={40} height={40} alt='logo' className='md:hidden'/>
      <p className='text-sm max-md:text-xs ml-1'>Mehrab's Blog</p>
      </Link>

      {session?.user?
      (<div className='flex flex-row gap-1.5 text-center items-center my-auto'>
        <Link className='max-md:text-xs backdrop-filter items-center my-auto text-center backdrop-blur-3xl bg-blue-600 bg-opacity-30 rounded-full p-1.5 transition-all hover:opacity-40 w-24 max-md:w-20' href='/create'>Create</Link>
        <button onClick={()=>{signOut()}} className='max-md:text-xs backdrop-filter items-center my-auto backdrop-blur-3xl text-center bg-blue-600 bg-opacity-30 rounded-full p-1.5 transition-all hover:opacity-40 w-24 max-md:w-20'>Sing Out</button>
        <Link href='/profile'>
        <Image src={session?.user.image} width={35} height={30} alt='profile' className='rounded-full max-md:hidden'/>
        <Image src={session?.user.image} width={28} height={28} alt='profile' className='rounded-full md:hidden'/>
        </Link>
      </div>):
      
      (<div>
        {providers&& Object.values(providers).map((provider)=>(
          <button type='button' key={provider.name} onClick={async()=>{await signIn(provider.id)}} className='max-md:text-xs max-md:w-20 text-center items-center my-auto backdrop-filter w-24 backdrop-blur-3xl bg-blue-600 bg-opacity-30 rounded-full p-1.5 transition-all hover:opacity-40'>
            Sign In
          </button>
        ))}</div>
      )}
      
      
    </nav>
  )
}

export default Nav
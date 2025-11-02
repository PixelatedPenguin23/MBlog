
import Feed from '@components/Feed'
import GsapWrapper from '@components/Gsap';
import Loading from '@components/loading';


import React, { Suspense } from 'react'
export const dynamic = 'force-dynamic';

const page = () => {
  return (
    <GsapWrapper>
      {/* estefade az wrapper, ke in file hanoz serverside bashe = SSR */}
    <section className='flex flex-col items-center'>
      <h1 className='text-xl font-'>Welcome To My Blog</h1>
      <p className='text-xs opacity-35'>Where we post daily</p>
    <div className='mt-8'>
      <Feed/>
    </div>
    </section>
    </GsapWrapper>
  )
}

export default page

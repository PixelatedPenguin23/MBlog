import React from 'react'
import PostCard from './PostCard'

const Profile =async({data,edit,del}) => {
  return(
    <div className='flex flex-row max-sm:flex-col max-sm:items-center gap-10 flex-wrap justify-center mb-10'>
    {data.map((post)=>(
      <PostCard
      post={post}
      key={post._id}
      del={()=>del&&del(post)}
      edit={()=>edit&&edit(post)}  
      />
    ))}
    </div>
  )
}

export default Profile
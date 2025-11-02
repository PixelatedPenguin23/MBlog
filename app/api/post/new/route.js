import {CD} from "@db/database"
import Postt from "@models/post"
import User from "@models/user"


export const POST=async (request) => {
  const {post,tag,userId}=await request.json()
  try {
    await CD()
    const user=await User.findById(userId)
    if (!user){return new Response('user not found',{status:500})}
    const nP=new Postt({
      creator:userId,post,tag
    })
    await nP.save()
    return new Response(JSON.stringify(nP),{status:201})
  } catch (error) {
    console.log(error);return new Response('error',{status:500})
  }
}
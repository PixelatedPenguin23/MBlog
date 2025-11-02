import {CD} from "@db/database"
import Postt from "@models/post"
export const dynamic = 'force-dynamic'
export const GET=async(request)=>{
  try {
    await CD()
    const f=await Postt.find({}).populate('creator')
    return new Response(JSON.stringify(f),{status:200})
  } catch (error) {
    return new Response('fail',{status:500})
  }
}

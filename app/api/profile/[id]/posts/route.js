import {CD} from "@db/database"
import Postt from "@models/post"

export const GET=async (request,{params}) => {
  try {
    await CD()
    const f=await Postt.find({creator:params.id}).populate('creator')
    return new Response(JSON.stringify(f),{status:200})
  } catch (error) {
    return new Response("failed",{status:500})
  }
}
import {CD} from "@db/database"
import Postt from "@models/post"

export const GET=async (request,{params}) => {
  try {
    await CD()
    const x=await Postt.findById(params.id)
    if(!x)return new Response('fail',{status:404})
    return new Response(JSON.stringify(x),{status:200})
  } catch (error) {
    return new Response("fail",{status:500})
  }
}

export const PATCH=async (request,{params})=>{
  const {post,tag}=await request.json()
  try {
    await CD()
    const x=await Postt.findById(params.id)
    x.post=post
    x.tag=tag
    await x.save()
    return new Response(JSON.stringify(x),{status:201})
  } catch (error) {
    return new Response('failed',{status:201})
  }
}

export const DELETE=async (request,{params}) => {
  try {
    await CD()
    await Postt.findByIdAndDelete(params.id)
    return new Response('deleted',{status:200})
  } catch (error) {
    return new Response('deleted',{status:500})
  }
}
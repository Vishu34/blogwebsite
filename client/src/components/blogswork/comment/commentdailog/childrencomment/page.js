"use client"

import { UseProfileContext } from "@/components/Context/UserprofileContext/page"
import axios from "axios"
import React, { useEffect, useState } from "react"


import moment from 'moment'
import { Box, Button, Typography } from "@mui/material"




const ChildrenComment=({commentbyid,fetchdata,setshowreply})=>{


    const {userinfo}=UseProfileContext()

const [reply , setreply]=useState("")
// const [commentdata1, setcommentdata1]=useState("")
console.log(reply)


const handlechange=(event)=>{
    setreply(event.target.value)
}



const onhandlesubmit = async(event)=>{
    event.preventDefault()
    setreply('')
    setshowreply(false)
try{

const res=await axios.post(`http://localhost:13000/newreplycomment`,{
    commentbyid,
    user:userinfo._id,
    comment:reply
})
if(res.status===201){
    const {message,data}= res.data
    fetchdata()
    console.log(data)
    
}else{
    console.log("no comment is here")
}
}catch(e){
console.error(e)
}


}



    return (
        <>
        <Box className="p-5 space-y-4">
        
        <form onSubmit={onhandlesubmit}>
        <textarea type="text" placeholder="leave here" className="w-[100%] px-2 outline-none border-2 focus:border-blue-200 rounded-md"
            value={reply} onChange={handlechange}
         />

         <Button  sx={{
            fontSize:8
         }} className=" text-white bg-black hover:text-black hover:bg-gray-100 rounded-full drop-shadow-xl"
         type="submit"> Reply</Button>

        </form>



       
</Box>
        </>
    )
}

export default ChildrenComment;
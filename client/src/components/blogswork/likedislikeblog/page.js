

"use client"

import { UseBloggetContext } from "@/components/Context/Blogget/page"
import { UseProfileContext } from "@/components/Context/UserprofileContext/page"
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import axios from "axios"


import { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LikeandDislike =({blogid,likenumber,likes})=>{

  
  const {userinfo}=UseProfileContext()


 
    const [like,setlike]=useState(false)

   console.log(userinfo)
  


const [authorbloglike,setauthorbloglike]=useState("")

console.log(authorbloglike)
    const handlelike=async(blogid)=>{

      
      
     
    try {
      
      if(!userinfo==[]){
        const res = await axios.put(
          `http://localhost:13000/updateLikes/${blogid}`,
         userinfo
          )
        
     
          if (res.status === 202) {
         
          const {message, data }= await res.data;
         setauthorbloglike(data)
           
          console.log(data);
       if(data.likes.includes(userinfo?._id)){
        setlike(true)
       }else{
        setlike(false)
       }
          
           
            
        } else {
         console.log("data nahi")
        }
      }else{
        console.log("data nah user i")
        // toast.success("home me ja", {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 1000, // 3000 milliseconds = 3 seconds
        //  hideProgressBar:"false"
        // })  
      }
    } catch (e) {
      console.error(e);
    }


    }


    return (
        <>
 <ToastContainer/>
 <Box className="flex items-center gap-1 cursor-pointer">

 {
                authorbloglike=="" ? likes==undefined ? (
                  <FavoriteBorder
                        sx={{
                          fontSize: "medium",
                        }}
                      onClick={()=>{handlelike(blogid)}}/>
                ) :likes.includes(userinfo?._id) ?
                (
                  <Favorite
                        sx={{
                          fontSize: "medium",
                          color:"red"
                        }}
                      onClick={()=>{handlelike(blogid)}}/>) :
                      ( <FavoriteBorder
                        sx={{
                          fontSize: "medium",
                        }}
                      onClick={()=>{handlelike(blogid)}}/>)
                      : authorbloglike.likes.includes(userinfo?._id) ?
                      <Favorite
                        sx={{
                          fontSize: "medium",
                          color:"red"
                        }}
                      onClick={()=>{handlelike(blogid)}}/> :
                       <FavoriteBorder
                        sx={{
                          fontSize: "medium",
                        }}
                      onClick={()=>{handlelike(blogid)}}/>
                     }

                     <Typography sx={{ fontSize: "small" }}>{!authorbloglike==""  ? authorbloglike.activity.total_likes : likenumber }</Typography>


 </Box>
        </>
    )
}


export default LikeandDislike
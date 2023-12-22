"use client"

import { UseProfileContext } from "@/components/Context/UserprofileContext/page"
import { GppBad } from "@mui/icons-material"
import { Box, Button, Input, Typography } from "@mui/material"
import axios from "axios"

import React, { useEffect, useState } from "react"
import ChildrenComment from "./childrencomment/page"
import ReplyCommnet from "./childrencomment/replycomment/page"
import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(englishStrings)


const Commentdailog=({setcomment, data})=>{

   
    const {userinfo}=UseProfileContext()

    const [commenttxt , settxt]=useState("")
    const [commentdata, setcommentdata]=useState("")
    console.log(commentdata)


    const handlechange=(event)=>{
        settxt(event.target.value)
    }



const handlecomment = async(blogid)=>{
try{

    const res=await axios.post(`http://localhost:13000/newcomment`,{
        blog_author:blogid,
        user:userinfo._id,
        comment:commenttxt
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


    const fetchdata = async () => {
      settxt('')
      try {
        const res = await axios.get(`http://localhost:13000/getcomment/${data._id}`,
        );

        if (res.status === 200) {
          const { message, data } = await res.data;
          console.log(data);
          setcommentdata(data)
          
        } else {
          console.log("data nahi aaya hai");
         
        }
      } catch (e) {
        console.error(e);
      }
    };

    useEffect(() => {
    fetchdata();
  }, [data._id]);



  const {comment_user, blogimage,heading}=commentdata
  console.log(comment_user, blogimage,heading)



  const [showreply,setshowreply]=useState(null)
const handlereply=(id)=>{
   setshowreply(id)
}


    return(
        <>

<Box className=" ">
<div className="flex justify-between text-sm p-5 ">

<Box className=" ">
     <Typography className="text-xs font-bold"> Comments</Typography>
     <Typography sx={{fontSize:8}} className=" ">
        {data?.title}
     </Typography>
</Box>
           
           <Box>
           <GppBad onClick={()=>setcomment(false)}
           
           className="cursor-pointer"/>
           </Box>
           

           
           </div>

         <Box className="p-5 space-y-4">
         <textarea type="text" placeholder="leave here" className="w-[100%] px-2 outline-none border-2 focus:border-blue-200 rounded-md"
            value={commenttxt} onChange={handlechange}
         />

         <Button  sx={{
            fontSize:8
         }} className=" text-white bg-black hover:text-black hover:bg-gray-100 rounded-full drop-shadow-xl"
         onClick={()=>{handlecomment(data._id)}}> Comment</Button>

         <Box>
            
            

        

         
                   
{
                    comment_user?.map(elm=>{
                        const {_id,comment, createdAt, user,reply_comment}=elm
                        return (
                             <React.Fragment key={_id}> 
                    <Box className={` space-x-3 p-2 my-2 bg-gray-100 rounded-md w-[100%] drop-shadow-lg`}>
                     

                      <Box className="space-y-2">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            
                          }}
                        className="flex justify-between items-center gap-2">
                          <Box className="flex items-center gap-1 ">
                                    
                                    <img
                                        src={user?.profilepic}
                                        alt="image"
                                        className="w-5 h-5 rounded-full border-2"
                                    />
                                    

                            <Box>
                                    <Typography
                                        sx={{
                                        fontSize: 10,
                                        }}
                                    >
                                        {user?.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                        fontSize: 10,
                                        }}
                                    >
                                        {user?.username
                                        ? user?.username
                                        : "@username"}
                                    </Typography>
                            </Box>
                          </Box>
                          
                          
                          <Box>
                          <Typography
                            sx={{
                              fontSize: 10,
                            }}
                          >
                             <TimeAgo date={createdAt} formatter={formatter} />
                          </Typography>
                          </Box>
                        </Box>

                       
                       <Box className="flex items-center justify-between">
                       <Typography className="font-bold text-xs">
                          {comment}
                        </Typography>
                        <Typography className="font-bold text-xs cursor-pointer text-green-600"
                        onClick={()=>{handlereply(_id)}}>
                          Reply
                        </Typography>
                        
                       </Box>
                      </Box>
                    </Box>
                    {
                        showreply===_id
                        &&
                            <ChildrenComment  setshowreply={setshowreply} commentbyid={_id} fetchdata={()=>{fetchdata()}}/>
                            
                        }

                       
                       <Box className="pl-5 py-1">
                       {
                    <ReplyCommnet reply_comment={reply_comment} />

}   
                       </Box>
                     </React.Fragment> 
                        )
                    })
                   

}                     
             
         </Box>
        
         </Box>
       
</Box>
        </>
    )
}


export default Commentdailog
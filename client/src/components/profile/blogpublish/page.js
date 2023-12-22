

"use client"

import { Box, Typography } from "@mui/material"
import Image from "next/image"
import React from "react"
import moment from 'moment'
import Link from "next/link"

const Blogpublish=({blogdata , author})=>{

    console.log(blogdata, author)
   const {profilepic, name , username}=author
    const {_id , blogimage, title,description,shortdescription,updatedAt} =blogdata
        return(
        <Box key={blogdata._id}>
<Box className={`md:flex items-center bg-gray-00 p-2 rounded-md md:space-y-0 space-y-2
my-2 border-gray-200 border-2 drop-shadow-md`}>
  <Box className=" w-[100%] md:w-[70%] flex flex-col p-1 space-y-1">
   
     
  <Box className="flex justify-between items-center gap-1">
                        <Box className="flex gap-1 items-center">
                          
                        <Box className="w-8 h-8 rounded-full">
                    {profilepic==[] ? (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
                        alt="imagehai"
                        className="w-[100%] h-[100%] rounded-full"
                      />
                    ) : (
                      <img
                        src={profilepic}
                        alt="imagehai"
                        className="w-[100%] h-[100%] rounded-full"
                      />
                    )}
                  </Box>
                          <Box>
                            <Typography sx={{
fontSize:12,
fontWeight:600
   }} className=" text-xs font-semibold capitalize">
                              {name}
                            </Typography>
                           

                           
                              <Typography sx={{
fontSize:12,
fontWeight:600
   }} className=" text-xs font-semibold capitalize hover:text-blue-600 cursor-pointer">
                                {username
                                  ? username
                                  : "@username"}
                              </Typography>
                           
                          </Box>
                        </Box>
                        <Typography className="text-xs">
                          {moment(updatedAt).format("Do MMM YYYY")}
                        </Typography>
                      </Box>

   <Typography sx={{
fontSize:12,
fontWeight:600
   }}> {title}</Typography>
   
   <Typography sx={{
    fontSize:11
   }}> {shortdescription}</Typography>
   
   

  </Box>
  
  <Box className=" w-[100%] md:w-[30%]">
  <Link href={`/blog/${title}_${_id}`.replace(/ /g, "-")}>
    <img src={blogimage}  alt="image"
    className="w-[100%] h-48 md:h-24 object-cover rounded-md"/>
    </Link>
  </Box>
</Box>
        </Box>
    )
}

export default Blogpublish
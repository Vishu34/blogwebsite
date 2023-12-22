"use client"

import { Box, Typography } from "@mui/material"
import React from "react"

import TimeAgo from 'react-timeago'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(englishStrings)

const ReplyCommnet=({reply_comment})=>{
    return (
        <>
{
    reply_comment?.map(elm=>{
                        const {_id,comment, createdAt, user,reply_comment}=elm
                        return (
                             <React.Fragment key={_id}> 
                    <Box className={` space-x-3 p-2 my-2 bg-gray-200 rounded-md w-[100%] drop-shadow-lg `}>
                     

                      <Box className="space-y-3">
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

                       
                       <Box className="flex items-center justify-between ">
                       <Typography className="font-bold text-xs">
                          {comment}
                        </Typography>
                        <Typography className="font-bold text-xs cursor-pointer text-green-600"
                       >
                          Reply
                        </Typography>
                        
                       </Box>
                      </Box>
                    </Box>
                   
                     </React.Fragment> 
                        )
                    })
                   
}
        </>
    )
}

export default ReplyCommnet
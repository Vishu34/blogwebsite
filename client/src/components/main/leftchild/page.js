"use client";
import style from "@/components/main/leftchild/[leftchild].module.css"
import { UseBloggetContext } from "@/components/Context/Blogget/page";
import { Comment, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useId, useState } from "react";
import moment from "moment";
import LikeandDislike from "../../blogswork/likedislikeblog/page";
import Shareblogs from "@/components/blogswork/share/page";

import io from 'socket.io-client'


const LeftChild = () => {



 const currenturl= "http://localhost:3000/"

  const {loading, blogdata1, listbtn } = UseBloggetContext();

  const [visible, setvisible] = useState(3);

  const Laodmorebtn = () => {
    setvisible((pre) => pre + 3);
  };

  
  console.log(blogdata1);
  return (
    <>
      <Box className="p-2 space-y-4 ">
        <Typography
          sx={{
            borderBottom: 1,
            padding: 2,
          }}
        >
          {listbtn}
        </Typography>
        { loading ? (
          <>
        
        <Box className="flex flex-col justify-center items-center align-middle space-y-1 h-20">
        <Box className={` ${style.spinner}`}></Box>
        <Typography sx={{
          fontSize:5
        }}> loading ...</Typography>
        </Box>

          </>
        ) :
          
        
               
                blogdata1.slice(0, visible).map((blog, index) => {
            const {
              _id,
              icon,
              authors,
              activity,
              blogimage,
              shortdescription,
              heading,
              title,
              likes,
              updatedAt,
            } = blog;

            return (
              <React.Fragment key={index}>
                <Box
                  className="space-y-4 md:space-y-0  flex flex-col-reverse md:flex md:flex-row md:justify-between bg-gray-100 md:space-x-3 md:items-center border-2  p-2 md:p-5  my-2 rounded-md
                  drop-shadow-lg"
                >
                  <Box className="flex flex-col justify-between space-y-2  p-2 md:py-0 w-[100%] md:w-[70%]">
                    <Box>
                      <Box className="flex justify-between items-center gap-1">
                        <Box className="flex gap-1 items-center">
                         {
                          !authors?.profilepic ==[]?
                          (
                            <img
                            src={authors?.profilepic}
                            alt="image"
                           
                            className="w-10 h-10 rounded-full border-2 border-blue-100"
                          />
                          ) :(
                            <Image
                            src="https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?size=626&ext=jpg&ga=GA1.1.1149601680.1700058223&semt=sph"
                            alt="image"
                            width={1000}
                            height={1000}
                            className="w-10 h-10 rounded-full border-2 border-blue-100"
                          />
                          )
                         } 

                          

                          <Box>
                            <Typography className=" text-xs font-semibold capitalize">
                              {authors?.name}
                            </Typography>

                            <Link href={`/user/${authors?._id}`}>
                              <Typography className=" text-xs font-semibold capitalize hover:text-blue-600 cursor-pointer">
                                {authors?.username
                                  ? authors?.username
                                  : "@username"}
                              </Typography>
                            </Link>
                          </Box>
                        </Box>
                        <Typography className="text-xs">
                          {moment(updatedAt).format("Do MMM YYYY")}
                        </Typography>
                      </Box>

                      <Typography className="font-bold">{title}</Typography>
                      <Typography>{shortdescription} ......!</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        alignContent: "center",
                      
                        gap: 1,
                      }}
                      className="flex justify-between items-center"
                    >
                      <Box className="flex items-center justify-between gap-1">
                      <Button
                        sx={{
                          fontSize: 8,
                        }}
                        className="bg-black text-white hover:bg-gray-100 hover:text-black rounded-full px-3  font-semibold uppercase drop-shadow-xl"
                      >
                        {heading}
                      </Button>
                     
                     {
                     
                     <Typography className="cursor-pointer">
                     <LikeandDislike blogid={_id} likenumber={activity.total_likes} likes={likes}/>
                     </Typography>
                     }
                      
                     <Typography sx={{
                      fontSize:11
                     }}>
                      <Comment sx={{fontSize:"medium"}} className="m-1"/>
                      {activity?.total_comments}
                     </Typography>
                      </Box>

                      {
                        <Shareblogs currenturl={currenturl}/> 
                      }
                    </Box>
                  </Box>

                  <Box className=" w-[100%] md:w-[30%]">
                    <Link href={`/blog/${title}_${_id}`.replace(/ /g, "-")}>
                      <img
                        src={blogimage}
                        alt="image"
                        className="w-[100%] h-[100%]    max-h-64 mx-auto  p-1 object-cover rounded-md"
                      />
                    </Link>
                  </Box>
                </Box>
              </React.Fragment>
            );
          })
               }
           

        {visible < blogdata1.length && (
          <Button
            sx={{
              fontSize: 8,
            }}
            className="hover:bg-black hover:text-white bg-gray-100 text-black  shadow-2xl drop-shadow-xl border-2"
            onClick={Laodmorebtn}
          >
            Load More
          </Button>
        )}
      </Box>
    </>
  );
};

export default LeftChild;

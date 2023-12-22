"use client";

import style from '@/app/user/[user].module.css'
import {
  Facebook,
  GitHub,
  Instagram,
  Twitter,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Blogpublish from "@/components/profile/blogpublish/page";

const AuthorProfile = () => {

   const {author}= useParams() 
  const authorId= author
 
 
 const[Authordata,setAuthordata]=useState([])
 
 

 

 
 
  useEffect(() => {
    const fetchdata = async () => {
     
      try {
        const res = await axios.get(`http://localhost:13000/getauthor/${authorId}`, {
         
        });

        if (res.status === 201) {
          const { message, data } = await res.data;
          

          setAuthordata(data);
        } else {
          console.log("data nahi aaya hai");
        
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchdata();
  }, []);


  const {
    blogs,
    createdAt,
    profilepic,
    name,
    email,
    account_info
,
    userbio,
    username,
    github,
    whatsapp,
    instagram,
    twitter,
    youtube,
    facebook,
    
  } = Authordata
 

 console.log(Authordata)

  return (
    <>
     
      

       
          
            <Box className="w-[100%] p-2 md:p-0 md:w-[80%] md:mx-auto rounded-md my-10  text-gray-600">
              <Box className="flex flex-col-reverse md:flex md:flex-row md:space-x-4   space-y-4 md:space-y-0">
                <Box className="w-[100%] md:w-[70%]">
                  <Typography className="text-sm border-b-2 py-2 border-gray-300 font-semibold">
                    Blogs Published
                  </Typography>

                  <Box className={` ${style.blogscroll}`}>
                    {
                      Array.isArray(blogs) ==[]  ?
                        (<>
                          <Typography className="text-center p-2 font-semibold text-sm"> No blog Published yet</Typography>
                        </>)
                      :

                     ( blogs.map((elm,index)=>{
                        const {_id}=elm
                       let author={
                        profilepic:profilepic,
                        name:name,
                        username:username
                       }
                        return(
                          <>
                            <React.Fragment key={index}>
                               
                            {
                              <Blogpublish  blogdata={...elm} author={author}/>
                            }
                            </React.Fragment>
                          </>
                        )
                      }))
                    }
                  </Box>
                </Box>


                <Box className="space-y-1 w-[100%] md:w-[30%]">
                  <Box className="w-16 h-16 rounded-full">
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

                  <Typography className="text-xs font-semibold"> {username ? username : "@username"}</Typography>
                  <Typography className="text-xs"> {name}</Typography>
                  <Box className="flex space-x-2">
                    <Typography className="text-xs">{!Array.isArray(blogs) ==[] ? blogs.length : "0"}  Blogs</Typography>
                    <Typography className="text-xs"> {account_info
?.total_reads ? account_info
.total_reads : "3.6"} Reads</Typography>
                  </Box>
                  <Typography className="text-xs"> {userbio}</Typography>
                  

                  <Box className="flex items-center space-x-1">
                    {github && (
                      <Link href={github}>
                        <GitHub  className="hover:text-black" sx={{ fontSize: "medium" }} />
                      </Link>
                    )}
                    {facebook && (
                      <Link href={facebook}>
                        <Facebook  className="hover:text-black" sx={{ fontSize: "medium" }} />
                      </Link>
                    )}
                    {whatsapp && (
                      <Link href={whatsapp}>
                        <WhatsApp  className="hover:text-black" sx={{ fontSize: "medium" }} />
                      </Link>
                    )}
                    {twitter && (
                      <Link href={twitter}>
                        <Twitter  className="hover:text-black" sx={{ fontSize: "medium" }} />
                      </Link>
                    )}
                    {instagram && (
                      <Link href={instagram}>
                        <Instagram  className="hover:text-black" sx={{ fontSize: "medium" }} />
                      </Link>
                    )}
                    {youtube && (
                      <Link href={youtube}>
                        <YouTube  className="hover:text-black" sx={{ fontSize: "medium" }} />
                      </Link>
                    )}
                  </Box>
                  <Typography className="text-xs">
                    
                    Joined on {moment(createdAt).format(" Do MMM  YYYY")}
                  </Typography>
                </Box>
              </Box>
            </Box>
        
    </>
  );
};

export default AuthorProfile;

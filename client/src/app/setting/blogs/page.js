"use client";
import style from '@/app/setting/blogs/[blogs].module.css'
import { UseProfileContext } from "@/components/Context/UserprofileContext/page";
import Deleteblog from '@/components/blogswork/deleteblog/page';
import Editblog from '@/components/blogswork/editblog/page';
import Blogpublish from '@/components/profile/blogpublish/page';
import { MoreVert } from '@mui/icons-material';

import { Box, Input, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

const Blogs = () => {
  const { userinfo } = UseProfileContext();
  console.log(userinfo);
  const [publishbtn, setpublishbtn] = useState(false);

  const [userdata, setuserdata] = useState([]);
 

//   this is the publish data
  useEffect(() => {
    const fetchdata = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("tokenvishu="))
        ?.split("=")[1];

      console.log("toke is " + token);
      try {
        const res = await axios.get("http://localhost:13000/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 201) {
          const { message, data } = await res.data;
          console.log(data);

          setuserdata(data);
        } else {
          console.log("data nahi aaya hai");
          router.push("/signin");
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchdata();
  }, []);

  const {
    blogs,
   _id,
    profilepic,
    username,
    name,
  } = userdata;

  const authors={_id}

 

  


  const [menu, setmenu]=useState(true)

 const handleClick=()=>{
    setmenu(true)
 }




  return (
    <>
      <Box className="space-y-4  w-[100%] md:w-[85%] p-2">
        <Typography
          sx={{
            fontSize: 10,
          }}
          className="text-sm"
        >
          Manage Blogs
        </Typography>
       

        <Box className="flex gap-2">
          <Typography
            sx={{
              fontSize: 10,
            }}
            className={`cursor-pointer drop-shadow-xl  px-3 py-1 rounded-full   border-2 ${
              publishbtn ? "bg-black text-white" : "bg-gray-100 text-black"
            }`}
            onClick={() => {
              setpublishbtn(true);
            }}
          >
            
            Publish
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
            }}
            className={`cursor-pointer drop-shadow-xl  px-3 py-1 rounded-full   border-2 ${
              publishbtn ? "bg-gray-100 text-black" : " bg-black text-white"
            }`}
            onClick={() => {
              setpublishbtn(false);
            }}
          >
            
            Save Drafts
          </Typography>
        </Box>

        {publishbtn ? (
          <>
            <Box className="p-2 my-2">
             
            <Box className={`${style.blogscroll}`}>
                    {
                      Array.isArray(blogs) ==[]  ?
                        (<>
                          <Typography className="text-center p-2 font-semibold text-sm"> No blog Published yet</Typography>
                        </>)
                      :

                     ( 
                        
                        blogs.map((elm,index)=>{
                        
                        let author={
                        profilepic:profilepic,
                        name:name,
                        username:username
                       }
                        return(
                          <>
                            <React.Fragment key={elm._id}>
                               
                           
                           <Box className="relative ">
                           {
                              <Blogpublish className={`${style.blogscroll}`} blogdata={...elm} author={author}/>
                            
                           
                            }
                            
                           
                           <Box className="absolute  top-0 right-0">
                           {
                                authors?._id === userinfo._id && (
                <>
                  <Box className="relative cursor-pointer">
                    <MoreVert 
                         
        
       onClick={handleClick}
                    className='bg-gray-200 rounded-full w-5 h-5 p-1 flex items-center justify-center'/>
                    
                    {
                        menu && (
                            <>
                            <Box className="bg-white drop-shadow-xl border-2 space-y-2 py-2   rounded-md absolute top-2 right-6 z-50">

                            {
                              <Deleteblog  setmenu={setmenu} blogauthorid={elm._id} className="text-red-500"/>
                            }
                                          
                              {
                                <Editblog  setmenu={setmenu} blogauthorid={elm._id}/>
                              }           
                                         
                                        </Box>
                            </>
                        )
                    }
                      </Box>
                      </>)
                      
                      }   
                           </Box>   

                           </Box>


                            </React.Fragment>
                          </>
                        )
                      }))
                    }
                  </Box>
                </Box>


                
          </>
        ) : (
          <>
            <Box className="py-2 my-2">hellosave</Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Blogs;

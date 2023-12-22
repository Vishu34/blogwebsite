"use client";

import { Box, Button, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import "jodit";
import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
import { useBlogpostContext } from "@/components/Context/Blogpost/page";
import Image from "next/image";
import CustomizedDialogs from "@/components/publish/Dialogbox/page";
import axios from "axios";
import { useRouter } from "next/navigation";



const Writeblog = ({ placeholder }) => {

  const router=useRouter()



  const { imageurl,heading, title, content, setcontent,setblogpost,blogpost
, open , setOpen, handleClickOpen,blogpostdata } = useBlogpostContext();

  console.log(heading)
console.log(content)
  const handleblogpost = (event) => {
    setblogpost({
      ...blogpost,
      [event.target.name]: event.target.value,
    });
  };
  const config = {
    readonly: false,
    placeholder: placeholder || "Start typing...",
  };

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

        if (res.status===201) {
          const { message, data } = await res.data;
          
          
          
        } else {
          console.log("data nahi aaya hai");
         router.push("/signin")
        
        }
      } catch (e) {
        console.error(e);
       
      }
    };
    fetchdata();
  }, []);




  return (
    <>
    
      <Box className="w-[100%] p-2 md:p-0 md:w-[80%] md:mx-auto rounded-md my-10 bg-gray-100 text-gray-600">
        <form className="flex flex-col space-y-4" onSubmit={handleClickOpen}>
          {imageurl ? (
            <Image
              src={imageurl}
              width={10000}
              height={10000}
              className="w-[100%] h-56 mx-auto object-cover rounded-md"
            alt="image"/>
          ) : (
            <Box className="w-[100%] h-56 border-4 mx-auto rounded-md">
              <Box className="text-4xl font-semibold flex justify-center my-20  w-[100%] rounded-md">
                
                Blog Images
              </Box>
            </Box>
          )}
          <input
            type="text"
            name="imageurl"
            value={imageurl}
            required
            placeholder="Enter the url of the images"
            className="text-md font-normal px-2 py-1 outline-none border-2 focus:border-blue-200 rounded-md"
            onChange={handleblogpost}
          />

        <input
            type="text"
            name="heading"
            value={heading}
           
            onChange={handleblogpost}
            placeholder="Heading"
            className="text-lg font-semibold px-2 py-1 outline-none border-2 focus:border-blue-200 rounded-md"
          />
          <input
            type="text"
            name="title"
            value={title}
            required
            onChange={handleblogpost}
            placeholder="Blog Title"
            className="text-lg font-semibold px-2 py-1 outline-none border-2 focus:border-blue-200 rounded-md"
          />

          <Box>
            <JoditEditor
              value={content}
              required
              config={config}
              tabIndex={1}
              onBlur={(newcontent) => setcontent(newcontent)}
            />
          </Box>

          
          <Box className="flex justify-end items-center space-x-2 my-5">
          <Button sx={{
            fontSize:8,
            textDecoration:"toLowerCase"
          }} className="bg-black text-gray-200 hover:bg-gray-200 hover:text-black rounded-full"
          type="submit">
          
             Publish
          </Button>
          <Button sx={{
            fontSize:8,
            textDecoration:"toLowerCase"
          }} className="hover:bg-black hover:text-gray-200 bg-gray-200 text-black rounded-full">
            Save Draft
            </Button>
          </Box>
        </form>
      </Box>
     {
        open && <CustomizedDialogs open={open} setOpen={setOpen}/>
     } 
    </>
  );
};

export default Writeblog;

"use client"


import { useBlogpostContext } from "@/components/Context/Blogpost/page";
import { Close } from "@mui/icons-material";
import { Box, Button, Input, Typography } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UseProfileContext } from "@/components/Context/UserprofileContext/page";

const TagInput = () => {
  const router = useRouter();
  const { blogpostdata, setOpen } = useBlogpostContext();
  const {setuserdata}=UseProfileContext()
  const { _id, blogimage, title } = blogpostdata;

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [wordtext, setWordText] = useState("");

  const handleInputChange = (e) => {
   
    if(tags.length<=9){
      setInputValue(e.target.value);
    }
  };

  
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTags([...tags, inputValue]);
      setInputValue(""); // Clear the input value after adding the tag
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const handleTextareaChange = (e) => {
    if (e.target.value.length <= 200) {
      setWordText(e.target.value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePublish = async () => {
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("tokenvishu="))
    ?.split("=")[1];

  console.log("toke is " + token);

    try {
      const res = await axios.put(`http://localhost:13000/updateBlogs/${_id}`, {
        shortdescription: wordtext,
        tags: tags
      },
      {
        
          headers:{
            Authorization:"Bearer "+token
          }
        

      });

      if (res.status === 200) {
        const data = await res.data;
         console.log(data)
        toast.success('Published', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
          onClose: () => {
            setTimeout(() => {
              router.push("/");
            }, 1000);
          },
        });
      } else {
        const data = await res.data;
        console.log(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <ToastContainer />
     
     <React.Fragment key={_id}>
     <Box className="bg-white py-2 fixed top-0 w-[100%] z-50 h-[100%] overflow-y-scroll text-gray-600">
        <Box className="relative text-gray-600">
          <Close className="absolute -top-8 right-3 cursor-pointer" onClick={handleClose} />
          <Box className="md:flex items-center md:space-x-3 md:mx-5 lg:mx-16 my-10 text-gray-500 p-2 md:p-0">
            <Box className="w-[100%] md:w-[40%] space-y-3">
              <Typography className=" text-xs">Preview</Typography>
              <img
                src={blogimage}
                alt="mag"
                className="w-[100%] rounded-md h-80"
              />
              <Typography sx={{ fontWeight: 600 }} className="text-xs font-bold">{title}</Typography>
              <Typography className="text-xs">{wordtext}</Typography>
            </Box>
            <Box className="flex flex-col space-y-4 w-[100%] md:w-[60%]">
              <div className="">
                <Typography className="text-xs p-1 font-semibold ">
                  Blog Title
                </Typography>
                <Typography className="p-2 bg-gray-200  rounded-md text-xs font-semibold">{title}</Typography>
              </div>
              <div className="">
                <Typography className="text-xs p-1 font-semibold ">
                  Short Description about your post
                </Typography>
                <textarea
                  placeholder="type here"
                  className="px-2 border-2 outline-none focus:border-blue-200 h-52 rounded-md w-[100%]"
                  value={wordtext}
                  onChange={handleTextareaChange}
                ></textarea>
                <Typography className="text-xs">
                  {200 - wordtext.length} character left
                </Typography>
              </div>
              <div className="bg-gray-200 py-2 px-2 rounded-md">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Press Enter to add tags"
                  className="px-3 py-1 border-2 outline-none focus:border-blue-200 rounded-md w-[100%]"
                />
                <div className="my-2 gap-2 flex flex-wrap">
                  {tags.length <= 10 &&
                    tags.map((tag, index) => (
                      <span
                        key={index}
                        className="tag bg-white py-1 px-2 mx-1 rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => handleTagRemove(tag)}
                          className="font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                </div>
                <span className="text-right font-semibold flex justify-end">
                  {10 - tags.length} tags left
                </span>
              </div>
              <Box className="flex justify-end items-center my-5">
                <Button
                  sx={{
                    fontSize: 8,
                    textDecoration: "toLowerCase"
                  }}
                  className="bg-black text-gray-200 hover:bg-gray-200 hover:text-black rounded-full"
                 
                  onClick={handlePublish}
                >
                  Publish
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
     </React.Fragment>
    </>
  );
};

export default TagInput;

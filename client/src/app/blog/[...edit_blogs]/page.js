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
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Editblogs = ({ placeholder }) => {

  const router=useRouter()
  const param =useParams()
   const {edit_blogs:[name,blogid]}=param
console.log(blogid)




  const { setblogpost,blogpost,setcontent,content
  } =useBlogpostContext()

 


  const handleblogpost = (event) => {
    setblogpost({
      ...blogpost,
      [event.target.name]: event.target.value,
    });
  };

  const {imageurl,heading, title}=blogpost
  const config = {
    readonly: false,
    placeholder: placeholder || "Start typing...",
  };




  const [tagss, setTagss] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [wordtext, setWordText] = useState("");

  const handleInputChange = (e) => {
   
    if(tagss.length<=9){
      setInputValue(e.target.value);
    }
  };



  console.log(tagss)
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTagss([...tagss, inputValue.trim()]);
      setInputValue(""); // Clear the input value after adding the tag
    }else if (e.key === " " && inputValue.trim() !== "" ) {
      const parts = inputValue.split(" ");
      console.log(parts)
      setTagss([...tagss, ...parts]); // Add each part as a separate tag
      setInputValue(""); // Clear the input value after adding the tag
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTagss = tagss.filter((tag) => tag !== tagToRemove);
    setTagss(updatedTagss);
  };

  const handleTextareaChange = (e) => {
    if (e.target.value.length <= 200) {
      setWordText(e.target.value);
    }
  };

 

  useEffect(() => {
    const fetchdata = async () => {
      
      try {
        const res = await axios.get(`http://localhost:13000/GetAuthorblog/${blogid}`);

        if (res.status===201) {
          const { data } = await res.data;
           console.log(data)
           
          setblogpost({
            ...blogpost,
            imageurl:data.blogimage,
            heading:data.heading,
            title:data.title
            
          })
          setTagss([...data.tags])
          setWordText(data.shortdescription)
          setcontent(data.description)
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


  const handleEditBlog= async()=>{
    try{


      const res = await axios.put(`http://localhost:13000/AuthorEditblogs/${blogid}`,{
        blogimage : imageurl,
        heading:heading,
        title:title,
        shortdescription:wordtext,
        description:content,
        tags:tagss
      })

      if(res.status===202){
        const {message, data}= await res.data
        console.log(message, data)

        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000, // 3000 milliseconds = 3 seconds
          onClose: () => {
            setTimeout(() => {
           
           router.push("/")
              
            }, 1000);
          }
        })      
      }
    }catch(e){
      console.log(e)
    }
  }


  return (
    <>
    <ToastContainer/>
      <Box className="w-[100%] p-2 md:p-0 md:w-[80%] md:mx-auto rounded-md my-10 bg-gray-100 text-gray-600">
     
        <Box className="flex flex-col space-y-4">
          {imageurl ? (
            <img
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
            accept="image/*"
            pattern="https?://.+\.(png|jpe?g|gif)"
            contentEditable={true}
            readOnly={false}
          />
          
        <input
            type="text"
            name="heading"
            value={heading}
            contentEditable={true}
            readOnly={false}
            onChange={handleblogpost}
            placeholder="Heading"
            className="text-lg font-semibold px-2 py-1 outline-none border-2 focus:border-blue-200 rounded-md"
          />
          <input
          contentEditable={true}
          readOnly={false}
            type="text"
            name="title"
            value={title}
            required
            onChange={handleblogpost}
            placeholder="Blog Title"
            className="text-lg font-semibold px-2 py-1 outline-none border-2 focus:border-blue-200 rounded-md"
          />


<Box className="">
                <Typography className="text-xs p-1 font-semibold ">
                  Short Description about your post
                </Typography>
                <textarea
                contentEditable={true}
                readOnly={false}
                  placeholder="type here"
                  className="px-2 border-2 outline-none focus:border-blue-200 h-52 rounded-md w-[100%]"
                  value={wordtext}
                  onChange={handleTextareaChange}
                ></textarea>
                <Typography className="text-xs">
                  {200 - wordtext.length} character left
                </Typography>
              </Box>


          <Box>
            <JoditEditor
            contentEditable={true}
            readOnly={false}
              value={content}
              required
              config={config}
              tabIndex={1}
              onBlur={(newcontent) => setcontent(newcontent)}
            />
          </Box>


     <Box>

    
              <div className="bg-gray-200 py-2 px-2 rounded-md">
                <input
                contentEditable={true}
                readOnly={false}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Press Enter to add tagss"
                  className="px-3 py-1 border-2 outline-none focus:border-blue-200 rounded-md w-[100%]"
                />
                <div className="my-2 gap-2 flex flex-wrap">
                  {tagss.length <= 10  &&
                    tagss.map((tag, index) => (
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
                  {10 - tagss.length} tagss left
                </span>
              </div>
     </Box>
          
          <Box className="flex justify-end items-center space-x-2 my-5">
          <Button sx={{
            fontSize:8,
            textDecoration:"toLowerCase"
          }} className="bg-black text-gray-200 hover:bg-gray-200 hover:text-black rounded-full"
          onClick={handleEditBlog}>
          
             Edit
          </Button>
         
          </Box>
        </Box>
      </Box>
     
    </>
  );
};

export default Editblogs;

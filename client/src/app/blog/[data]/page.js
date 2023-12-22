"use client";

import style from '@/app/blog/[data]/[data].module.css'


import {
  Comment,
  Delete,
  DeleteOutline,
  Edit,
  GppBad,
  FavoriteBorder,
  More,
  MoreVert,
  Remove,
  Twitter,
  Favorite,
  
} from "@mui/icons-material";
import { Box, Menu, MenuItem, Typography, styled } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import LikeandDislike from '@/components/blogswork/likedislikeblog/page';
import Shareblogs from '@/components/blogswork/share/page';
import Deleteblog from '@/components/blogswork/deleteblog/page';
import Editblog from '@/components/blogswork/editblog/page';
import parse from 'html-react-parser';
import Commentdailog from '@/components/blogswork/comment/commentdailog/page.';
import Commentpage from '@/components/blogswork/comment/page';
import { UseProfileContext } from '@/components/Context/UserprofileContext/page';

// to sanitize the htlcontent which are comming from the jodit react

import DOMPurify from 'dompurify';



const Blog = () => {


 
const {userinfo}=UseProfileContext()

const authorId=userinfo?._id

    const router= useRouter()
  
 
  const [loading , setloading]=useState(false)
  const [particulardata, setdata] = useState([]);
  const [commentbtn, setcomment] = useState(false);
  console.log(particulardata);
  const param = useParams();
  console.log(param);
  
  const { data } = param;
  const currenturl=`http://localhost:3000/blog/${data}` 
  console.log(currenturl)
  const data_id = data.split("_")[1];
  console.log(data_id);

  useEffect(() => {
    const data1 = particulardata.filter((elm, index) => {
      return elm.id === data_id;
    });

    setdata(data1);
  }, []);

  

  useEffect(() => {
    const fetchdata = async () => {
       
      
      setloading(true)
      try {
        const res = await axios.get(
          `http://localhost:13000/getparticularblogs/${data_id}`
        );

        if (res.status === 201) {
         
          const { data } = await res.data;
          const timer=setTimeout(() => {
           
          console.log(data);
       
          
           
            setdata(data);
            setloading(false)
        
          }, 3000);
           return ()=> clearTimeout(timer)
            
        } else {
          router.push("/signin")
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchdata();
  }, []);

 


  const Section = styled(Box)``;

  const {
    _id,
    icon,
    blogimage,
    publish,
    title,
   activity,
    name,
    list,
    likes,
    comment,
    description,
    authors,
    updatedAt,
  } = particulardata;
  console.log(authors?._id + "and " + authorId);



  const [menu, setmenu] =useState(false);
  
  const handleClick = () => {
    setmenu(!menu);
  };

  
  const sanitizedHtml = DOMPurify.sanitize(description);
   


  
  return (
    <>
    <ToastContainer/>
     
     {
        !loading ? (
            <>
            <Section className=" w-[100%] p-2 md:p-0 md:w-[80%] md:mx-auto rounded-md my-10 bg-gray-100 text-gray-600 drop-shadow-lg">
        <Box>
          <img
            src={blogimage}
            alt="imag"
            className="w-[100%] h-80 rounded-md object-cover"
          />

          <Box className="p-2 md:p-5 space-y-3">
            <Box className="flex justify-between items-center">
              <Typography className="font-bold text-lg">{title}</Typography>
              {authors?._id === authorId && (
                <>
                  <Box className="relative cursor-pointer">
                    <MoreVert 
                         
        
       onClick={handleClick}
                    />
                    
                    {
                        menu && (
                            <>
                            <Box className="bg-white drop-shadow-xl border-2 space-y-2 py-2   rounded-md absolute top-2 right-6">

                            {
                              <Deleteblog  setmenu={setmenu} blogauthorid={_id}/>
                            }
                                          
                              {
                                <Editblog  setmenu={setmenu} blogauthorid={_id}/>
                              }           
                                         
                                        </Box>
                            </>
                        )
                    }
                   
                  </Box>
                </>
              )}
            </Box>
            <Box className="flex justify-between">
              <Box className="flex space-x-2 items-center">
               
               {
                !authors?.profilepic ==[]?

               ( <img
                  src={authors?.profilepic}
                  alt="imag"
                 
                  className="w-8 h-8 rounded-full"
                />) :

( <img
                  src=""
                  alt="imag"
                 
                  className="w-8 h-8 rounded-full"
                />)
               }
               
               <Box>
               <Typography  sx={{
                fontSize:10
               }} className="text-xs">{authors?.name}</Typography>
                <Typography  sx={{
                  fontSize:10
                }} className="text-xs">{authors?.username}</Typography>
               </Box>
              </Box>
              <Typography  sx={{
                fontSize:10
              }} className="text-xs">
                published on {moment(updatedAt).format(" Do MMM YYYY ")}
              </Typography>
            </Box>

            <Box className="flex items-center justify-between ">
             
               
              
           
                     
                 
                 
                 <Box className="flex gap-1 items-center">
                 
                   
                 {
                  <LikeandDislike blogid={_id} likenumber={activity?.total_likes}/>
                 }

                 
                 <Box className="flex gap-1 items-center">
                 {
                    <Commentpage setcomment={setcomment} commentbtn={commentbtn}/>
                    
                   }
                   
                   <Typography className='' sx={{fontSize:"small"}}>{activity?.total_comments}</Typography>
                 </Box>
                  
                  
                 </Box>
               

               
             

             {
              <Shareblogs currenturl={currenturl}/>
             }
            </Box>
            
            <Typography>
            {
                sanitizedHtml? (
                    <>
                   
                    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml}}
                   suppressHydrationWarning={true}></div>
                  
                  

            
                    </>
                ):
                (
                    <>
                        <p>Loading .............</p>
                    </>
                )
            }
           
             
            </Typography>
          </Box>
        </Box>
      </Section>
            </>
        ) :
        (
            <>
             
             <Box className="flex flex-col justify-center align-middle items-center  h-44">
              <div className={`${style.loader} `}></div>
              <Typography sx={{ fontSize:8}}>please wait...</Typography>
              </Box>

            </>
        )
     }

      {commentbtn && (
        <>
          <Box className="fixed top-0 right-1 h-[100%] bg-gray-100 text-gray-600 border-l-2 drop-shadow-lg  w-[100%] md:w-[30%] blogscroll">
            <Commentdailog setcomment={setcomment} data={particulardata}/>
          </Box>
        </>
      )}
    </>
  );
};

export default Blog;

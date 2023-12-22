"use client"

import { Box } from "@mui/material"
import axios from "axios"
import Image from "next/image"
import MobileMenu from "./menu/page"


const { useEffect, useState } = require("react")

const MobileNav=()=>{

    const [profile,setprofile]=useState(null)
  const [username,setusername]=useState(null)
  const [userlogin ,setlogin]=useState("")
  const[close,setclose]=useState(false)

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
         setprofile(data.profilepic)
        setusername(data.username)
        } else {
          console.log("data nahi aaya hai");
          
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchdata();
  }, []);

  useEffect(()=>{
    let token1 = document.cookie
    .split("; ")
    .find((row) => row.startsWith("tokenvishu="))
    ?.split("=")[1];
   
   setlogin(token1)
  },[userlogin])


  

    return (
        <>
           
           <Box className="bg-gray-100 relative drop-shadow-xl">
           <Box className="flex space-x-4 justify-between items-center 
          py-3 mx-5">
                <Image src="/bird.png" alt="Image" 
                width={10000} height={10000}
                    className="w-10 h-10"
                />
                 
                 <Box>
                 {
                    profile ==[] ? (
                        <>
                        <Image
                        width={10000}
                        height={10000}
                      src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
                      alt="imag"
                     
                      className="w-10 h-10 rounded-full"
                      onClick={()=>{setclose(!close)}}
                      
                    />
                        </>
                      ) : (
                        <>
                        <img
                        
                      src={profile}
                      alt="imag"
                      
                      className="w-10 h-10 rounded-full object-top"
                      onClick={()=>{setclose(!close)}}
                      
                    />
                        </>
                      )
                    }
                 </Box>
            </Box>

           
           </Box>

           {
            close &&
                <MobileMenu username={username} setclose={setclose}/>
            }
        </>
    )
}

export default MobileNav;
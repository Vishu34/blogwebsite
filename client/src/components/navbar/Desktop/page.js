"use client";

import {  UseBloggetContext } from "@/components/Context/Blogget/page";
import { NotificationAdd } from "@mui/icons-material";
import { Box, Button, Container, Input } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import styled from "styled-components";
import Profilemenu from "./menu/page";
import { UseProfileContext } from "@/components/Context/UserprofileContext/page";
import axios from "axios";

const Section = styled(Box)``;



const Desktop = () => {

  const [profile,setprofile]=useState(null)
  const [username,setusername]=useState(null)
  console.log(profile)
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



  const { search, setsearch,authors } = UseBloggetContext();

 
  

  
 

  const [menu, setmenu] = useState(false);
 
  const handleclick = () => {
    setmenu(!menu);
  };

 


 
  
  const [userlogin ,setlogin]=useState("")

  useEffect(()=>{
    let token1 = document.cookie
    .split("; ")
    .find((row) => row.startsWith("tokenvishu="))
    ?.split("=")[1];
   
   setlogin(token1)
  },[userlogin])


  
  return (
    <>
      <Section className="bg-gray-100  drop-shadow-lg">
        <Box
          className=" flex space-x-4 justify-between items-center 
          py-3 md:mx-5 lg:mx-16"
        >
          <Box className="flex space-x-4 items-center">
            <Image
              src="/bird.png"
              alt=""
              className="w-10 h-10"
              width={100000}
              height={100000}
            />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
              placeholder="search"
              
              className="px-4 bg-white rounded-full py-2 text-sm text-black hover:border-2 border-2 hover:border-blue-200 curser-pointer outline-none drop-shadow-xl"
            />
          </Box>

          <Box>
            <ul className="flex space-x-4 items-center">
              <li>
                <Button
                  sx={{
                    fontSize: 8,
                  }}
                  className="bg-white px-4 py-2 font-medium text-black rounded-full drop-shadow-xl"
                >
                  <Link href="/publish"> Write</Link>
                </Button>
              </li>

              
              {userlogin ? ( <>
                 
                 <Link href="/setting/notification">
                 <li className="bg-white w-7 h-7 rounded-full text-center">
                    
                    <NotificationAdd
                      sx={{
                        fontSize: "medium",
                      }}
                    />
                  </li>
                 </Link>

                  <li className="relative">
                    
                    {
                    profile ==[] ? (
                        <>
                        <Image
                        width={1000}
                        height={1000}
                      src="https://cdn-icons-png.flaticon.com/512/219/219988.png"
                      alt="imag"
                     
                      className="w-10 h-10 rounded-full"
                      onClick={handleclick}
                      
                    />
                        </>
                      ) : (
                        <>
                        <img
                        
                      src={profile}
                      alt="imag"
                      
                      className="w-10 h-10 rounded-full"
                      onClick={handleclick}
                      
                    />
                        </>
                      )
                    }
                   
                   {
                    menu && (
                      <>
                      <Profilemenu menu={menu} setmenu={setmenu} username={username}/>
                      </>
                    )
                   }
                  </li>
                </>)
              :
                (<>
                  <Link href="/signin">
                    <li>
                      <Button
                        sx={{
                          fontSize: 8,
                        }}
                        className="bg-black text-white px-4 py-2 font-medium  rounded-full hover:bg-black hover:text-white drop-shadow-xl"
                      >
                        Sign In
                      </Button>
                    </li>
                  </Link>

                  <Link href="/signup">
                    <li>
                      <Button
                        sx={{
                          fontSize: 8,
                        }}
                        className="bg-white px-4 py-2 font-medium text-black rounded-full hover:bg-black hover:text-white drop-shadow-xl"
                      >
                        Sign Up
                      </Button>
                    </li>
                  </Link>
                </>)
              }
            </ul>
          </Box>
        </Box>
      </Section>
    </>
  );
};

export default Desktop;

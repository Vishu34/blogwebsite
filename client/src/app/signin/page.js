"use client";

import { Email, PasswordRounded, Person, UsbRounded, VpnKey } from "@mui/icons-material";
import { Box, Button, Input, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter  } from "next/navigation";
import axios from "axios";
import { UseProfileContext } from "@/components/Context/UserprofileContext/page";

const Section = styled(Box)``;
const Login = () => {

 const {userinfo,setuserinfo}=UseProfileContext()




  useEffect(()=>{

     localStorage.setItem("userinfo", JSON.stringify(userinfo))
  },[userinfo])

  const router=useRouter()

    const initialstate={
        name:"",
        email:"",
        password:"",
       

    }
   
const[data,setdata]=useState(initialstate)

const {name,email,password}=data

const handlechage=(event)=>{
    setdata({...data, [event.target.name]:event.target.value})
}


const handlesubmit=async(event)=>{
  event.preventDefault()

try{
const res= await axios.post("http://localhost:13000/signin",{
  name,
email,
  password

})
if(res.status===201){
  const {token,data,message}= await res.data
  
  setuserinfo(data)
  console.log(token)
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000, // 3000 milliseconds = 3 seconds
    onClose: () => {
      setTimeout(() => {
     window.location.href="/"
     router.push("/")
        
      }, 1000);
     
    setTimeout(() => {
     
      window.location.reload()
      
    }, 2000);
      // Redirect after toast message
    },
   
  });

  document.cookie=`tokenvishu=${token} ; path=/`
 
}else{
  toast.error("invalid login", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000, // 3000 milliseconds = 3 seconds
  })
}
}catch(e){
  console.log(e)
  toast.error("invalid login", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000, // 3000 milliseconds = 3 seconds
  })
}

}
  return (
    <>
     <ToastContainer />
      <Section className="bg-gray-100 sm:w-[50%] lg:w-[30%] mx-auto mt-16 p-5 rounded-md">
        <form onSubmit={handlesubmit}
        className=" flex-col space-y-5">
          <Typography className="text-center font-extrabold text-lg uppercase ">Join Us Today</Typography>
          <Box className="flex items-center bg-gray-200 rounded-full p-1 border-2 hover:border-2 hover:border-blue-200 ">
            
            <Person sx={{
                fontSize:"medium"
            }}/>
            <Input

              type="text"
              name="name"
              value={name}
              onChange={handlechage}
              autoComplete="off"
              placeholder="Enter your Name"
              sx={{ fontSize: 10 }}
              className="w-[100%] px-3"
            />
          </Box>
          <Box className="flex items-center bg-gray-200 rounded-full p-1 border-2 hover:border-2 hover:border-blue-200">
            
            <Email sx={{
                fontSize:"medium"
            }}/>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handlechage}
              autoComplete="off"
              placeholder="user@gmail.com"
              sx={{ fontSize: 10 }}
              className="w-[100%] px-3"
            />
          </Box>
          <Box className="flex items-center bg-gray-200 rounded-full p-1 border-2 hover:border-2 hover:border-blue-200">
            
            <VpnKey sx={{
                fontSize:"small"
            }}/>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handlechage}
              autoComplete="off"
              placeholder="Enter your password"
              sx={{ fontSize: 10 }}
              className="w-[100%] px-3"
            />
          </Box>
          
         
         <Box className="mx-auto w-[30%] text-center  ">  <Button  type ="submit" className="bg-black text-white hover:text-black  hover:bg-gray-200 px-4 rounded-full text-xs font-bold"> Sign In</Button></Box>
         <Box className="space-y-2"> 
        <Typography sx={{
          textAlign:"center",
          fontSize:10,


         }}>New member <Link href="/signup" className="hover:text-blue-500 font-semibold border-b-2 border-black"> Signup</Link></Typography>
          <Typography sx={{
          textAlign:"center",
          fontSize:10,

          
         }}>Forgot password <Link href="/signup" className="hover:text-blue-500 font-semibold border-b-2 border-black"> Click here</Link></Typography>
         </Box>
        </form>
      </Section>
    </>
  );
};

export default Login;

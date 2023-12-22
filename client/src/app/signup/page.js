"use client"
import styled from "@emotion/styled"
import { Email, Password, Person, UsbRounded, VpnKey } from "@mui/icons-material"
import { Box, Button, Typography,Input, form } from "@mui/material"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"
 

const Section=styled(Box)``
const SignUP=()=>{

  const router=useRouter()

    const initialstate={
        name:"",
        email:"",
        password:"",
        confirmpassword:""

    }
   
const[data,setdata]=useState(initialstate)

const {name,email,password,confirmpassword}=data

const handlechage=(event)=>{
    setdata({...data, [event.target.name]:event.target.value})
}

console.log(name,email,password,confirmpassword)

const handlesubmit=async(event)=>{
    event.preventDefault()

    try{
        // const res= await axios.post("http://localhost:12000/signup",
        // {
        //     name:name,
        //     email:email,
        //     password:password,
        //     confirmpassword:confirmpassword

        // })
        const response=await fetch("http://localhost:13000/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
              
                name,
                email,
                password,
                confirmpassword
              
           
            })
        });

        if(response.status===201){
            const data= await response.json()
            console.log(data)
            toast.success('Registration successful!', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1000, // 3000 milliseconds = 3 seconds
              onClose: () => {
              setTimeout(() => {
                router.push("/signin")
              }, 1000);
                // Redirect after toast message
              },
            });
        }else {
          
         const {message}=await response.json()
         console.log(message)
          toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000, // 3000 milliseconds = 3 seconds
            
          });
        }
    }catch(e){
        console.error(e)
    }

}

    return (
        <>
        <ToastContainer />
         <Section className="bg-gray-100 sm:w-[50%] md:w-[30%] mx-auto mt-16 p-5 rounded-md">
        <form onSubmit={handlesubmit}
        className=" flex-col space-y-5">
          <Typography className="text-center font-extrabold text-lg uppercase ">Create a New Blog</Typography>
          <Box className="flex items-center bg-gray-200 rounded-full p-1 border-2  hover:border-2 hover:border-blue-200 ">
            
            <Person sx={{
                fontSize:"medium"
            }}/>
            <Input
            name="name"
              type="text"
            value={name}
            onChange={handlechage}
            autoComplete="off"
              placeholder="Enter your Name"
              sx={{ fontSize: 10 }}
              className="w-[100%] px-3 border-2 "
            />
          </Box>
          <Box className="flex items-center bg-gray-200 rounded-full p-1 border-2  hover:border-2 hover:border-blue-200">
            
            <Email sx={{
                fontSize:"small"
            }}/>
            <Input
             name="email"
              type="email"
              value={email}
              onChange={handlechage}
              autoComplete="off"
              placeholder="user@gmail.com"
              sx={{ fontSize: 10 }}
              className="w-[100%] px-3 border-2 "
            />
          </Box>
          <Box className="flex items-center bg-gray-200 rounded-full p-1 border-2  hover:border-2 hover:border-blue-200">
            
            <VpnKey sx={{
                fontSize:"small"
            }}/>
            <Input
             name="password"
              type="password"
              value={password}
              onChange={handlechage}
              autoComplete="off"
              placeholder="Enter your password"
              sx={{ fontSize: 10 }}
              className="w-[100%] px-3 border-2 "
            />
          </Box>
          <Box className="flex items-center bg-gray-200 rounded-full p-1 border-2  hover:border-2 hover:border-blue-200">
            
            <VpnKey sx={{
                fontSize:"small"
            }}/>
            <Input
             name="confirmpassword"
              type="password"
              value={confirmpassword}
              onChange={handlechage}
              autoComplete="off"
              placeholder="Confirm password"
              sx={{ fontSize: 10 }}
              className="w-[100%] px-3 border-2 "
            />
          </Box>
          
         
         <Box className="mx-auto w-[30%] text-center  ">  <Button type="submit" className="bg-black text-white hover:text-black  hover:bg-gray-200 px-4 rounded-full text-xs font-bold"> Sign Up</Button></Box>
         
         <Typography sx={{
          fontSize:10,
          textAlign:"center"
         }}> Already have a user? <Link href="/signin" className=" hover:text-blue-500 font-semibold border-b-2 border-black"> Sign In</Link></Typography>
        </form>
      </Section>
        </>
    )
}


export default SignUP
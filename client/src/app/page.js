"use client"

import LeftChild from "@/components/main/leftchild/page";
import RightChild from "@/components/main/rightchild/page";
import { Box, Container, Grid} from "@mui/material";
import { Data } from "@/components/main/Blogdata";
import { useEffect, useState } from "react";

export default function Home() {
 
 
  
  
  return (
    <>
   
     <Box>
        <div className="sm:flex-none md:flex md:mx-5 lg:mx-16 my-10 text-gray-600">
           <Box className="w-[100%] md:w-[70%]">
            <LeftChild />
           </Box>
           <Box className="w-[100%] md:w-[30%]">
            <RightChild/>
           </Box>
        </div>
     </Box>
    
    </>
  )
}

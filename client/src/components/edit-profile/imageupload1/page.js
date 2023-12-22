"use client"

import { Box, Input, Typography } from "@mui/material"
import Image from "next/image"
import style from '@/components/edit-profile/imageupload1/[imageupload1].module.css'
import { useState } from "react"
import { UseProfileContext } from "@/components/Context/UserprofileContext/page"


const Imageupload1=()=>{

    const {profilepicture,
        setprofilepicture}=UseProfileContext()

    const [image,setimage]=useState(false)
    const handleinput=()=>{
  setimage(!image)
    }


    const handlechange=(event)=>{
        setprofilepicture(event.target.value)

    }

    console.log(profilepicture)
    return(
        <>
        <Box className={`${style.img} w-20 h-20 rounded-full`}>
       
       {
        profilepicture ? (
            <>
            <Image
              src={profilepicture}
              alt="imag"
              width={2000}
              height={20000}
              className="w-20 h-20 rounded-full object-cover"
            />
            </>
        ) : (
            <>
            <Image
              src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg"
              alt="imag"
              width={2000}
              height={20000}
              className="w-20 h-20 rounded-full object-cover"
            />
            </>
        )
       }
            <Typography className={`${style.imgtext} p-5 text-white text-xs cursor-pointer`} onClick={handleinput}> upload images</Typography>
        </Box>


 {
    image && (
       <Input type="text" placeholder="image url"  className="border-2 px-3" value={profilepicture} onChange={handlechange} accept="image/*"/>
    )
 }
        </>
    )
}


export default Imageupload1
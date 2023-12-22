"use client"

import { Assignment, Create, Edit, Notes, Notifications, VpnKey } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import Link from "next/link"





const Navbar=()=>{
    return (
        <>
            <Box className="space-y-3 text-gray-700  w-[100%] md:w-[15%] border-r-2">
            <Typography className="font-bold text-lg"> Dashboard</Typography>
                 <ul className="flex space-x-4 md:space-x-0 md:flex md:flex-col md:space-y-1 text-xs">
                    <li className="flex items-center space-x-2"><Assignment sx={{ fontSize:"small"}}/> <Link href="/setting/blogs"> Blogs</Link></li>
                    <li className="flex items-center space-x-2"><Notifications sx={{ fontSize:"small"}}/><Link href="/setting/notification"> Notification</Link></li>
                    <li className="flex items-center space-x-2"><Notes sx={{ fontSize:"small"}}/> <Link href="/setting/write"> Write</Link></li>
                   
                    
                    

                 </ul>
                 <Typography className="font-bold text-lg"> Settings</Typography>
                 <ul className="text-xs flex space-x-4 md:space-x-0 md:flex md:flex-col md:space-y-1">
                 <li className="flex items-center space-x-2"> <Edit sx={{ fontSize:"small"}}/> <Link href="/setting/edit-profile"> Edit-Profile</Link></li>
                    <li className="flex items-center space-x-2"><VpnKey sx={{ fontSize:"small"}}/><Link href="/setting/change-password"> Change-Password</Link></li>
                 </ul>
            </Box>
        </>
    )
}

export default Navbar
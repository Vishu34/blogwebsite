"use client"

import { Close, Delete, GppBad } from "@mui/icons-material"
import { Box, List, ListItem } from "@mui/material"


const MobileMenu=({username, setclose})=>{
    return (
        <>


<Box className="bg-gray-100 fixed top-0 z-50  w-[100%] h-[100%]">
  <GppBad className="absolute top-2 right-2 cursor-pointer hover:text-blue-600 font-semibold"
    onClick={()=>{setclose(false)}}
  />
    <ListItem className="flex flex-col  mt-5 items-start cursor-pointer">
        <List className="hover:text-black text-gray-500 font-semibold text-sm">Profile</List>
        <List className="hover:text-black text-gray-500 font-semibold text-sm">Dashboard</List>
        <List className="hover:text-black text-gray-500 font-semibold text-sm">Setting</List>
       
            <List>
                <div className="hover:text-black text-gray-500 font-semibold text-sm">Logout</div>
                <div className=" font-semibold text-xs">{username ? username : "@user"}</div>
            </List>
           

        

    </ListItem>
</Box>
        </>
    )
}


export default MobileMenu
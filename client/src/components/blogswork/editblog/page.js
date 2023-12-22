"use client";

import { Typography } from "@mui/material";
import Link from "next/link";

const Editblog = ({setmenu, blogauthorid}) => {

    const handleEdit = async(blogauthorid) => {
        setmenu(false);
    
      try{
    
        const res = await fetch("http://localhost:13000/Editblogs/")
        if(res.status===202){
          const data = await res.json()
          console.log(data)
    
        }else{
          console.log("you can edit this ")
        }
      }catch(error){
        console.error(error)
      }
      };
    
  return (
    <>
      <Link href={`/blog/editblogs/${blogauthorid}`}>
        <Typography
          className="hover:bg-gray-200   px-3 text-sm font-medium py-1"
          onClick={handleEdit}
        >
          
          Edit
        </Typography>
      </Link>
    </>
  );
};

export default Editblog;

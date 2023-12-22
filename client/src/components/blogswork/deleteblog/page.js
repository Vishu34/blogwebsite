"use client"

import { Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Deleteblog=({ setmenu,blogauthorid})=>{

    const router=useRouter()


    const handleDeleteblog=async(blogauthorid)=>{
        setmenu(false)
        try{
    console.log("bloghaut ai " +blogauthorid)
            const res = await axios.delete(`http://localhost:13000/deleteblog/${blogauthorid}`)
      
             if(res.status===204){
                toast.success("blog is successfully deleted", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000, // 3000 milliseconds = 3 seconds
                    onClose: () => {
                      setTimeout(() => {
                     
                     router.push("/")
                        
                      }, 1000);
                     
                   
                      // Redirect after toast message
                    },
                   
                  });
                
              
             }else{
                console.log("not deleted")
             }
    
        }catch(e){
            console.error(e)
        }
    }
    return (
        <>

<Typography className="hover:bg-gray-200   px-3 text-sm font-medium py-1 cursor-pointer" onClick={()=>{handleDeleteblog(blogauthorid)}}>Delete</Typography>
        </>
    )
}

export default Deleteblog
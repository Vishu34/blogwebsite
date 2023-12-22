"use client"

import { Comment } from "@mui/icons-material";


const Commentpage=({setcomment,commentbtn})=>{

    return(
        <>
<p
                  className="space-x-2 text-xs font-medium gap-1 cursor-pointer"
                  onClick={() => setcomment(!commentbtn)}
                  
                >
                  <Comment
                    sx={{
                      fontSize: "medium",
                    }}
                    className="cursor-pointer"
                  />
                 
                </p>


                
        </>
    )
}

export default Commentpage
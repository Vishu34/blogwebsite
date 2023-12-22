"use client";
import axios from "axios";
import * as React from "react";
import { createContext, useContext } from "react";

const Appcontext = createContext(null);

const BlogpostContext = ({ children }) => {

  const initialstate = {
    imageurl: "",
    heading:"",
    title: "",

  };
  const [blogpost, setblogpost] = React.useState(initialstate);
  const [content, setcontent] = React.useState("");
  const { imageurl, title,heading } = blogpost;
 const[blogpostdata,setdata]=React.useState([])
 


const [open, setOpen] = React.useState(false)






  const handleClickOpen = async(e) => {
    e.preventDefault()
    setOpen(true)
   
  try{

    
            const res= await axios.post("http://localhost:13000/blogpost",
            
            {
                blogimage: imageurl,
                heading:heading,
                title: title,
                description:content
            }
            
            )
    
            if(res.status===201){
                const {message,data}= await res.data;
                setdata(data)
                console.log(data)
            }else{
                const data = await res.data;
                console.log(data)
            }
        }catch(e){
            console.error(e)
        }

    
   
  };

 
    
  return (
    <>
      <Appcontext.Provider
        value={{
         
          imageurl,
          heading,
          content,
          setcontent,
          title,
          blogpost,
          setblogpost,
          open, 
          setOpen,
          handleClickOpen,
          blogpostdata
          

        }}
      >
        {children}
      </Appcontext.Provider>
    </>
  );
};

const useBlogpostContext = () => {
  return useContext(Appcontext);
};
export { BlogpostContext, useBlogpostContext };

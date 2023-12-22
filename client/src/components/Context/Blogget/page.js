"use client"

import axios from "axios"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

const Appcontext=createContext(null)
const BloggetContext=({children})=>{

  const [likes, setlikes]=useState([])
    const [loading, setloading]=useState(false)
    const[search,setsearch]=useState("")
    const [blogdata,setdata]=useState([])
    const [blogdata1,setblogdata]=useState([])
 
    useEffect(() => {
      const fetchdata = async () => {
       
       setloading(true)
        try {
          const res = await axios.get("http://localhost:13000/getblogs", {
           
          });
  
          if (res.status===201) {
           const { message, data } = await res.data;
          
           setdata(data)
            const timer= setTimeout(() => {
             
              setblogdata(data)
              
             setloading(false)
            },3000);
            return ()=> clearTimeout(timer)
          } else {
            console.log("data nahi aaya hai");
          
          
          }
        } catch (e) {
          console.error(e);
         
        }
      };
      fetchdata();
    }, []);

 
    const [listbtn,setlistbtn]=useState("All")
    
   
  console.log(listbtn)
    
  // if any data is rendering over and over again 
  // then we can use the usememo to rerender the data 
  const memoize= useMemo(()=>{
    let templatedata=[...blogdata1]
    if(listbtn!=="All"){
      templatedata=templatedata.filter(elm=>{
        return elm.heading===listbtn
      })
  
    }
  
    if(search){
      templatedata=templatedata.filter(elm=>{
          return elm.title.toLowerCase().includes(search.toLowerCase())
          || elm.tags.includes(search.toLowerCase())
      })
    }
    
    return templatedata
   },[listbtn,search,blogdata1])
  
  






    return (
        <>
<Appcontext.Provider value={{
   blogdata1:memoize,
    blogdata,
    listbtn,
    setlistbtn,
   loading,
    search,
    setsearch ,
   likes,
   setlikes

}}>
    {children}
</Appcontext.Provider>
        </>
    )
}

const UseBloggetContext=()=>{
    return useContext(Appcontext)
}

export  {BloggetContext,UseBloggetContext}
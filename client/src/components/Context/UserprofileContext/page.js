"use client"

const { createContext, useContext, useState, useEffect } = require("react")


const Appcontext= createContext(null)

const ProfileUserContext=({children})=>{

    const [userinfo,setuserinfo]=useState([])
    const [profilepicture, setprofilepicture] = useState("");
    const [userdata,setuserdata]=useState({})

useEffect(()=>{

    const userdata=localStorage.getItem("userinfo")
    if(userdata ==[]){
        return []
    }else{
        setuserinfo(JSON.parse(userdata))
    }
},[])


return (
    <Appcontext.Provider value={{
        userinfo,
        setuserinfo,
userdata,
setuserdata,
profilepicture,
setprofilepicture
    }}>
        {children}
    </Appcontext.Provider>
)
}

const UseProfileContext=()=>{
    return useContext(Appcontext)
}
export {ProfileUserContext,UseProfileContext}
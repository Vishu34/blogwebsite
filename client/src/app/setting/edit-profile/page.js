"use client";

import { UseProfileContext } from "@/components/Context/UserprofileContext/page";
import Imageupload from "@/components/edit-profile/imageupload/page";
import Imageupload1 from "@/components/edit-profile/imageupload1/page";
import {
  Email,
  Facebook,
  GitHub,
  Instagram,
  Person,
  Twitter,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import { Box, Input, Typography, Button } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditProfile = () => {

  const router= useRouter()
  const { userdata, setuserdata, profilepicture } = UseProfileContext();
 console.log(profilepicture)

  const { _id, name, email } = userdata;
  console.log(_id);

  const [formdata, setformdata] = useState({
    profilepic: profilepicture,
    username: "",
    userbio: "Bio",
    github: "",
    facebook: "",
    whatsapp: "",
    instagram: "",
    youtube: "",
    twitter: "",
  });
  const {
    username,
    userbio,
    facebook,
    github,
    whatsapp,
    instagram,
    youtube,
    twitter,
    profilepic,
  } = formdata;

  console.log(
    github,
    username,
    userbio,
    twitter,
    instagram,
    facebook,
    youtube,
    profilepic
  );

  const handlechange = (event) => {
    if (event.target.value.length <= 200) {
      setformdata({
        ...formdata,
        userbio: event.target.value,
      });
    }
  };

  const handleuser = (event) => {
    setformdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    setformdata({
      profilepic: "",
      username: "",
      userbio: "",
      github: "",
      facebook: "",
      whatsapp: "",
      instagram: "",
      youtube: "",
      twitter: "",
    });

    try {
      const response = await axios.put(
        `http://localhost:13000/edit-profile/${_id}`,
        {
          profilepic: profilepicture,
          username,
          userbio,
          github,
          facebook,
          whatsapp,
          instagram,
          youtube,
          twitter,
        }
      );
      if (response.status === 202) {
        const {message, data }= await response.data;
        console.log(data);

        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000, // 3000 milliseconds = 3 seconds
          onClose: () => {
            setTimeout(() => {
           
           router.push("/profile")
         
           
              
            }, 1000)

            setTimeout(() => {
           
             window.location.reload()
            
              
                 
               }, 800)
           
          
           }}) ;
           
           
           
           

           
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("tokenvishu="))
        ?.split("=")[1];

      console.log("toke is " + token);
      try {
        const res = await axios.get("http://localhost:13000/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 201) {
          const { message, data } = await res.data;
          console.log(data);
          setuserdata(data);
        } else {
          console.log("data nahi aaya hai");
          router.push("/signin")
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
    <ToastContainer/>
      <Box className=" w-[100%] md:w-[85%] p-2">
        <Typography>Edit Profile</Typography>
        <form
          className="space-y-4 md:space-y-0 md:flex md:space-x-8 mt-2"
          onSubmit={handlesubmit}
        >
          <Box className="w-[100%] md:w-[10%] flex flex-col items-center space-y-3">
          
            {<Imageupload1/>}
            {/* {<Imageupload />} */}
            <Button
              sx={{ fontSize: 8 }}
              className="bg-black text-white hover:bg-gray-200 hover:text-black"
              
              type="submit"
            >
              
              Update
            </Button>
          </Box>
          <Box className=" w-[100%] md:w-[90%] space-y-4">
            <Box className="space-y-3 md:space-y-0 md:flex md:space-x-4">
              <div className="w-[100%] flex items-center p-2 bg-gray-200 rounded-md text-gray-400 space-x-2">
                <Person
                  sx={{
                    fontSize: "small",
                  }}
                />
                <Typography>{name}</Typography>
              </div>

              <div className="w-[100%] flex items-center p-2 bg-gray-200 rounded-md text-gray-400 space-x-2">
                <Email
                  sx={{
                    fontSize: "small",
                  }}
                />
                <Typography> {email}</Typography>
              </div>
            </Box>
            <div className="w-[100%] flex items-center px-2 bg-gray-200 rounded-md">
              <Input
                required
                type="text"
                name="username"
                value={username}
                onChange={handleuser}
                placeholder="@ username"
                className="w-[100%] px-3  border text-black"
              />
            </div>
            <p className="text-xs">
              This is your username all user will see your user name
            </p>

            <textarea
            required
              className="w-[100%] h-32 p-2 outline-none border-2 focus:border-blue-200 rounded-md"
              name="userbio"
              value={userbio}
              placeholder="Bio about yourself"
              onChange={handlechange}
            ></textarea>
            <Typography className="flex justify-end -space-y-3 text-xs">
              {200 - userbio.length} character remaining
            </Typography>
            <Box className="space-y-4 md:space-y-0 md:flex md:space-x-5">
              <div className="w-[100%] flex items-center px-2 bg-gray-200 rounded-md">
                <GitHub
                  sx={{
                    fontSize: "small",
                  }}
                />
                <Input
                  
                  type="text"
                  name="github"
                  value={github}
                  onChange={handleuser}
                  placeholder="https://"
                  className="w-[100%] px-3  border text-black"
                />
              </div>
              <div className="w-[100%] flex items-center px-2 bg-gray-200 rounded-md">
                <Facebook
                  sx={{
                    fontSize: "small",
                  }}
                />
                <Input
                  
                  type="text"
                  name="facebook"
                  value={facebook}
                  onChange={handleuser}
                  placeholder="https://"
                  className="w-[100%] px-3  border text-black"
                />
              </div>
            </Box>
            <Box className="space-y-4 md:space-y-0 md:flex md:space-x-5">
              <div className="w-[100%] flex items-center px-2 bg-gray-200 rounded-md">
                <WhatsApp
                  sx={{
                    fontSize: "small",
                  }}
                />
                <Input
                  
                  type="text"
                  name="whatsapp"
                  value={whatsapp}
                  onChange={handleuser}
                  placeholder="https://"
                  className="w-[100%] px-3  border text-black"
                />
              </div>
              <div className="w-[100%] flex items-center px-2 bg-gray-200 rounded-md">
                <Instagram
                  sx={{
                    fontSize: "small",
                  }}
                />
                <Input
                  
                  type="text"
                  name="instagram"
                  value={instagram}
                  onChange={handleuser}
                  placeholder="https://"
                  className="w-[100%] px-3  border text-black"
                />
              </div>
            </Box>
            <Box className="space-y-4 md:space-y-0 md:flex md:space-x-5">
              <div className="w-[100%] flex items-center px-2 bg-gray-200 rounded-md">
                <YouTube
                  sx={{
                    fontSize: "small",
                  }}
                />
                <Input
                  
                  type="text"
                  name="youtube"
                  value={youtube}
                  onChange={handleuser}
                  placeholder="https://"
                  className="w-[100%] px-3  border text-black"
                />
              </div>
              <div className="w-[100%] flex items-center px-2 bg-gray-200 rounded-md">
                <Twitter
                  sx={{
                    fontSize: "small",
                  }}
                />
                <Input
                  
                  type="text"
                  name="twitter"
                  value={twitter}
                  onChange={handleuser}
                  placeholder="https://"
                  className="w-[100%] px-3  border text-black"
                />
              </div>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default EditProfile;

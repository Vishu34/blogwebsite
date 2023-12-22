"use client";

import { UseProfileContext } from "@/components/Context/UserprofileContext/page";
import { NoiseAware } from "@mui/icons-material";
import { Box, List, ListItem, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Notification = () => {
  // const {userinfo}=UseProfileContext()

  const [notifydata, setdata] = useState(null);

  console.log(notifydata);

  const userinfo = "656393fb4d1f5c8b81fafdf6";
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:13000/getusernotification/${userinfo}`,
          {}
        );

        if (res.status === 200) {
          const { message, data } = await res.data;
          console.log(data.notifications);
          setdata(data.notifications);
        } else {
          console.log("data nahi aaya hai");
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchdata();
  }, []);

  // const [open, setopen] = useState(true);

  // const handleclick = (event) => {
  //   let templatedata = notifydata.filter((elm) => {
  //     return elm.type === event;
  //   });

  //   setdata(templatedata);
  // };

  return (
    <>
      <Box className="space-y-4  w-[100%] md:w-[85%] p-2">
        <Typography className="text-sm"> Recent Notification</Typography>
        {/* <ul className="flex items-center justify-start  space-x-3 text-xs cursor-pointer">
          <li
            className={` drop-shadow-xl px-3 py-1 font-medium  rounded-full hover:bg-black hover:text-white ${
              open ? "bg-black text-white ": "bg-white text-black"}`}
            onClick={() => {
              setdata(notifydata);
            }}
          >
           
            All
          </li>
          <li
            className={` drop-shadow-xl px-3 py-1 font-medium  rounded-full   ${
              open ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              handleclick("likes");
            }}
          >
           
            Like
          </li>
          <li
            className={` drop-shadow-xl px-3 py-1 font-medium  rounded-full hover:bg-black hover:text-white ${
              open ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              handleclick("comments");
            }}
          >
           
            Comment
          </li>
          <li
            className={` drop-shadow-xl px-3 py-1 font-medium  rounded-full hover:bg-black hover:text-white ${
              open ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              handleclick("replies");
            }}
          >
           
            Reply
          </li>
        </ul> */}

        {notifydata === null
          ? "null"
          : notifydata.map((elm) => {
              return (
                <>
                  <Box className="bg-gray-100 drop-shadow-xl w-[100%] sm:w-[60%] md:w-[30%] rounded-md p-2 ">
                    <Link
                      href={`/blog/${elm.author_blog.title}_${elm.author_blog._id}`.replace(
                        / /g,
                        "-"
                      )}
                    >
                      <Box
                        className="flex items-start 
                      
                      space-x-2 justify-between"
                      >
                        <Box className="flex items-start space-x-2">
                          <img
                            src={elm?.userinfo?.profilepic}
                            alt="iamge"
                            className="w-7 h-7 rounded-full border-2"
                          />

                          {elm?.type === "comments" ? (
                            <Typography className="text-sm">
                              {elm?.userinfo?.name} commented on your blog{" "}
                              {elm?.comment?.comment}
                            </Typography>
                          ) : elm?.type === "replies" ? (
                            <Typography className="text-sm">
                              {elm?.userinfo?.name} replied on your comment{" "}
                              {elm?.comment?.comment}
                            </Typography>
                          ) : elm?.type === "likes" ? (
                            <Typography className="text-sm">
                              {elm?.userinfo?.name} liked your blog
                            </Typography>
                          ) : null}
                        </Box>

                        <img
                          src={elm?.author_blog?.blogimage}
                          alt="iamge"
                          className="w-10 h-10 rounded-md border-2"
                        />
                      </Box>
                    </Link>
                  </Box>
                </>
              );
            })}
      </Box>
    </>
  );
};

export default Notification;

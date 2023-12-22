"use client";
import { UseBloggetContext } from "@/components/Context/Blogget/page";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import moment from "moment";
const Section = styled(Box)``;

const RightChild = () => {
  const { blogdata, setlistbtn, listbtn } = UseBloggetContext();

  console.log(blogdata);

  const getlistdata = (data, attr) => {
    let newval = data.map((elm) => {
      return elm[attr];
    });

    newval = ["All", ...new Set(newval)];
    return newval;
  };

  const list = getlistdata(blogdata, "heading");
  console.log(list);
  return (
    <>
      <Section className="p-2  lg:px-8 space-y-4 ">
        <Typography
          sx={{
            padding: 2,
          }}
        >
          Stories from all interest
        </Typography>
        <Box>
          <ul className="flex flex-wrap gap-2 items-center content-center">
            {list.map((elm, index) => {
              return (
                <React.Fragment key={index}>
                  <li>
                    {" "}
                    <Button
                      sx={{
                        fontSize: 8,
                      }}
                      className={`hover:bg-black hover:text-white uppercase rounded-full px-3   drop-shadow-lg  ${
                        elm === listbtn
                          ? `bg-black text-white `
                          : `bg-gray-100   text-black `
                      }`}
                      onClick={() => {
                        setlistbtn(elm);
                      }}
                    >
                      {elm}{" "}
                    </Button>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </Box>

        <Box className="">
          <Typography className="font-bold text-sm py-2 ">
            {" "}
            Trending ~
          </Typography>

          <Box className=" flex-wrap ">
            {blogdata.slice(0, 5, 1).map((elm, index) => {
              console.log(blogdata);
              const { _id, icon, name, updatedAt, title, authors } = elm;
              console.log(authors?.profilepic);
              return (
                <>
                  <React.Fragment key={_id}>
                    <Box className="flex items-center  space-x-3 p-2 my-2 bg-gray-100 rounded-md w-[100%] drop-shadow-lg">
                      <Typography className="text-4xl font-extrabold text-gray-300">
                        0{index}
                      </Typography>

                      <Box className="space-y-2">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            
                          }}
                        className="flex justify-between items-center gap-2">
                          <Box className="flex items-center gap-1 ">
                                    {!authors?.profilepic == [] ? (
                                    <img
                                        src={authors?.profilepic}
                                        alt="image"
                                        className="w-5 h-5 rounded-full border-2"
                                    />
                                    ) : (
                                    <Image
                                        src="https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?size=626&ext=jpg&ga=GA1.1.1149601680.1700058223&semt=sph"
                                        alt="image"
                                        width={1000}
                                        height={1000}
                                        className="w-5 h-5 rounded-full border-2"
                                    />
                                    )}

                            <Box>
                                    <Typography
                                        sx={{
                                        fontSize: 10,
                                        }}
                                    >
                                        {authors?.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                        fontSize: 10,
                                        }}
                                    >
                                        {authors?.username
                                        ? authors?.username
                                        : "@username"}
                                    </Typography>
                            </Box>
                          </Box>
                          
                          
                          <Box>
                          <Typography
                            sx={{
                              fontSize: 10,
                            }}
                          >
                            {moment(updatedAt).format(" Do  MMM YYYY")}
                          </Typography>
                          </Box>
                        </Box>

                        <Typography className="font-bold text-xs">
                          {title}
                        </Typography>
                      </Box>
                    </Box>
                  </React.Fragment>
                </>
              );
            })}
          </Box>
        </Box>
      </Section>
    </>
  );
};

export default RightChild;

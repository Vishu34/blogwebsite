
"use client"


import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UseProfileContext } from '@/components/Context/UserprofileContext/page';
import style from '@/components/edit-profile/[image-upload].module.css';

const Imageupload = () => {
  const [files, setFiles] = useState([]);
  const { profilepicture, setprofilepicture } = UseProfileContext();
  const [imageurl, setImageUrl] = useState(null);

  useEffect(() => {
    if (imageurl) {
      blobToBase64(imageurl)
        .then(base64String => {
          setprofilepicture(base64String);
        })
        .catch(error => {
          console.error('Error converting Blob to Base64:', error);
        });
    }
  }, [imageurl, setprofilepicture]);

  const blobToBase64 = async (blobUrl) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const onDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
    setImageUrl(acceptedFiles[0].preview);
    console.log(acceptedFiles[0].preview)
  };

 console.log(files)
 console.log(profilepicture)
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={`overflow-hidden w-16 h-16 rounded-full curser-pointer ${style.parent}`}>
          <img src={profilepicture ? profilepicture : 'https://cdn-icons-png.flaticon.com/512/219/219988.png'} alt="imagehai" className='w-[100%] h-[100%]'/>
          <p className={` ${style.upload}`}>
            Upload Image
          </p>
        </div>
      </div>
    </>
  );
};

export default Imageupload;

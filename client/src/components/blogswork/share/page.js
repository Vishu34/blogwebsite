import style from '@/components/blogswork/share/[share].module.css'
import { Close, Share } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { useState } from "react"
import { ShareSocial } from 'react-share-social'

const Shareblogs = (currenturl="http://localhost:3000/" ) => {
  const customStyle = {
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      width: "100%",
      position: "fixed",
      top: "15%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      

    },
    copyContainer: {
      border: '1px solid blue',
      background: 'rgb(0,0,0,0.7)'
    },
    title: {
      color: 'aquamarine',
      fontStyle: 'italic'
    }
  };

  
  const [share, setShare] = useState(false);

  return (
    <>
      {share && (
        <Box className="">
          <ShareSocial
            url={currenturl.currenturl}
            socialTypes={['facebook', 'twitter', 'reddit', 'linkedin', 'whatsapp', 'telegram', 'line', 'ok']}
            style={customStyle}
            onSocialButtonClicked={data => console.log(data)}
           
          />
        </Box>
      )}

      <Typography>
        <Share
          sx={{ fontSize: "medium" }}
          onClick={() => { setShare(!share) }}
          className='cursor-pointer'
        />
      </Typography>
    </>
  )
}


export default Shareblogs;

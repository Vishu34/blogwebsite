import { Box } from "@mui/material";
import Link from "next/link";

const NotFound = () => {

    
  return (
    <>
      <Box id="notfound " className="text-center  flex flex-col justify-center align-middle items-center p-2">
        <Box className="notfound">
          <Box className="notfound-404">
            <h1 className="text-[150px] sm:text-[180px]  md:text-[230px] ">Oops!</h1>
          </Box>
          
          <Box className="mt-6">
          <h2>404 - Page not found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <Link href="/" className="goto">Go To Homepage</Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;

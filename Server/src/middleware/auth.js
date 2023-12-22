
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const auth =async(req,res,next)=>{
   
 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
   console.log("auth token is" +token)
   
try{

    const verify =await jwt.verify(token, 'vishusahuiammakingblogwebsitethanksmuch')
    console.log(verify)
  
     const rootuser = await User.findById({_id:verify._id})
    
     console.log(rootuser)
   req.rootuser = rootuser
   req.rootuserId= rootuser._id
   console.log("rootki id hia"+ req.rootuserId)
    next();
}catch(e){
    console.error(e)
    res.send("token is not equal to token");
}

}

module.exports = auth
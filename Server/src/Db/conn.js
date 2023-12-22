
const mongoose= require('mongoose')

mongoose.connect("mongodb://localhost:27017/newbloguser",{
    
}).then(()=>{
    console.log("connecter to database")
}).catch((e)=>{
    console.error(e)
})
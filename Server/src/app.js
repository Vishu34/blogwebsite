
const express = require("express");

const app = express();

const port = 13000;

require("../src/Db/conn");
const UserRouter = require("./Route/UserRoute");
const BlogRouter = require("./Route/BlogRoute");
const ComentRouter=require("./Route/CommentRoute")
const NotifyRouter=require("./Route/NofitfyRoute")
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
const cors = require("cors");



app.use(
  cors({
    origin: "*", // Replace with your frontend URL
    credentials: true,
  })
);

app.use("/", UserRouter);
app.use("/", BlogRouter);
app.use("/", ComentRouter)
app.use("/",NotifyRouter)


app.listen(port, (req, res) => {
  console.log(`server is running on the port ${port}`);
});

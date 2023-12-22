const BlogUser = require("../model/Blog");
const Notificationmodel = require("../model/Notification");
const User = require("../model/User");

const NewBlog = async (req, res) => {
  const { blogimage, title, description, heading } = req.body;
  console.log("blogpost data is" + blogimage, title, description, heading);
  try {
    if (!blogimage || !title || !description || !heading) {
      return res.status(400).json({
        message: "please fill all the field",
      });
    } else {
      const user = new BlogUser({
        blogimage,
        heading,
        title,
        description,
      });
      const result = await user.save();

      res.status(201).json({
        message: "Blog is successfully post",
        data: result,
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "internel server error",
    });
  }
};

const UpdateBlog = async (req, res) => {
  authorId = req.rootuserId;
  const blogid = req.params.id;

  try {
    const Setbloguser = await User.findByIdAndUpdate(
      { _id: authorId },
      {
        $push: {
          blogs: blogid,
        },
      }
    );

    const result = await BlogUser.findByIdAndUpdate(
      { _id: blogid },
      { $set: { authors: authorId, ...req.body } },
      { new: true }
    );

    res.status(200).json({
      data: result,
      message: "blog is published",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "internel server error",
    });
  }
};

const GetBlog = async (req, res) => {
  try {
    const result = await BlogUser.find({})
      .sort({ updatedAt: -1 })
      .populate("authors");

    res.status(201).json({
      message: "Blog is successfully post",
      data: result,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "internel server error",
    });
  }
};


const Getauthorblog = async (req, res) => {
  const blogauthorid = req.params.id;

  try {
    const result = await BlogUser.findById({ _id: blogauthorid });

    res.status(201).json({
      data: result,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "internel server error",
    });
  }
};

const EditAuthorblog = async (req, res) => {
  const blogauthorid = req.params.id;
  console.log("editblog" + req.body);
  try {
    const result = await BlogUser.findByIdAndUpdate(
      {
        _id: blogauthorid,
      },
      req.body,
      { new: true }
    );

    console.log(result)

    res.status(202).json({
      message: "blog has been edited successfully",
      data:result
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "internel server error",
    });
  }
};

const GetparticularBlogs = async (req, res) => {
  
  const id = req.params.id;
  try {
    const result = await BlogUser.findById({ _id: req.params.id }).populate(
      "authors"
    );
    console.log(result);

    res.status(201).json({
      message: "Blog is successfully post",
      data: result,
      
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "internel server error",
    });
  }
};

const DeleteBlog = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await BlogUser.findByIdAndDelete({ _id: req.params.id });
    console.log(result);
    res.status(204).json({
      message: "successfully deleted the blogs",
      data: result,
    });
  } catch (e) {
    console.error(e);
  }
};

const UpdateLikes = async (req, res) => {
  const blogauthorid = req.params.id;
  console.log(blogauthorid);
  const userinfo = req.body;


  console.log("userinfo is"+ userinfo._id);
  try {
   
   
    // save the like in user's notificaation

    const notifyresult=await new Notificationmodel({
      type:"likes",
      
      
      author_blog:blogauthorid,
      userinfo:userinfo._id,
     
    })
   
    const savenotify=await notifyresult.save()
    console.log(savenotify)

      const blog = await BlogUser.findById({ _id: blogauthorid });
      
       // send id to user's notification 

       const usersetnofityid=await User.findByIdAndUpdate(
        {_id:blog.authors},
        {
          $push:{
            notifications:savenotify._id
          }
        },
        {
          new:true
        }
       )
       console.log(usersetnofityid)
        const existuser = blog.likes.includes(userinfo._id);
  
      if (existuser) {
        blog.activity.total_likes -= 1;
        const index = blog.likes.indexOf(userinfo._id);
        blog.likes.splice(index, 1);
        const result = await blog.save();
        console.log(result)
        res.status(202).json({
          message:"liked",
          data:result
        })
      } else {
        blog.activity.total_likes += 1;
        blog.likes.push(userinfo._id);
        const result = await blog.save();
        console.log(result)
        res.status(202).json({
          message:"Disliked",
          data:result
        })
      }
    
      
  
      
    

    
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "internel server error",
    });
  }
};



module.exports = {
  NewBlog,
  GetBlog,
  Getauthorblog,
  EditAuthorblog,
  UpdateBlog,
  GetparticularBlogs,
  DeleteBlog,
  UpdateLikes,
  
};

const BlogUser = require("../model/Blog");
const Commentmodel = require("../model/Comment");
const Notificationmodel = require("../model/Notification");
const User = require("../model/User");

const NewComment = async (req, res) => {
  const { comment, blog_author, user } = req.body;

  try {
    if (!blog_author || !user) {
      return res.status(400).json({
        message: "please fill all the field",
      });
    }else  if ( !comment) {
      return res.status(400).json({
        message: "blogid and user id is required",
      });
    } else {
      const commentuser = await new Commentmodel({
        comment,
        blog_author,
        user,
      });

      const commentresult = await commentuser.save();

    //   set the comment user id for populating
      const result1 = await BlogUser.findByIdAndUpdate(
        { _id: blog_author },
        {
          $inc: { "activity.total_comments": 1 },

          $push: {
            comment_user: commentresult._id,
          },
        },
        { new: true }
      );
     console.log(result1.authors)
      res.status(201).json({
        message: "Commnet is sent to the blogauthor",
        data: commentresult,
      });



      const notifyresult=await new Notificationmodel({
        type:"comments",
            author_blog:blog_author,
            userinfo:user,
            comment:commentresult._id,
            
      })
      const savenotify=await notifyresult.save()
     
    //   author of thr blog authors id and set 
    //   notificationi id to user's notificaitons
    console.log(savenotify)
     const usersetnofityid=await User.findByIdAndUpdate(
        {_id:result1.authors},
        {
            $push:{
                notifications:savenotify._id
            }
        },{
            new:true
        }
     )
     console.log(usersetnofityid)
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "internel server error",
    });
  }
};

const GetComment = async (req, res) => {
  const id = req.params.id;
  console.log("blogpost data is get commnet" + req.params.id);
  try {
    const result = await BlogUser.findById({ _id: req.params.id }).populate({
      path: "comment_user",
      populate: [{ path: "user"},{ path:"reply_comment", populate:[{path:"user"}],
    options:{
        sort:{createdAt:-1}
    } }],
      options: {
        sort: { createdAt: -1 },
      },

      // if you want to populate blog_author also then
      // use this  populate:[{path :'user'},{path:'blog_author'}],
    });
    // console.log(result);

    res.status(200).json({
      message: "Commnet is sent to the blogauthor",
      data: result,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "internel server error",
    });
  }
};

const NewReply = async (req, res) => {
  const { commentbyid, user, comment } = req.body;
  console.log(req.body);
  try {
    const commentbyuser = await Commentmodel.findById({ _id: commentbyid });
    console.log(commentbyuser);

    const replytocommentbyuser = await new Commentmodel({
      blog_author: commentbyuser.blog_author,
      user: user,
      comment: comment,
    });

    const savereply = await replytocommentbyuser.save();
   
    console.log(savereply);
    const result = await Commentmodel.findByIdAndUpdate(
     { _id: commentbyid,},
     {
       $push:{
        reply_comment:savereply._id
       }
     }, 
     {new:true}
    );


    const notifyresult= await new Notificationmodel({
        type:"replies",
      
            author_blog:commentbyuser.blog_author,
            userinfo:user,
            comment:savereply._id,
    })
    const savenotify=await notifyresult.save()

    console.log(savenotify)
    const usersetnofityid=await User.findByIdAndUpdate(
        {_id:commentbyuser.user._id},
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

    res.status(201).json({
        message: "reply to comment by user",
      });
    console.log(result)
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "internel server error",
    });
  }
};
module.exports = { NewComment, GetComment, NewReply };

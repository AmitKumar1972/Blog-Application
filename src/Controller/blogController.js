const { users } = require('../models');
const db=require('../models');
const blogTable=db.Blog;
const userTable=db.User;


var addBlog=async (req,res)=>{
    let data=await blogTable.build({blogId:req.user.id,blogContent:req.body.blogContent});
    await data.save();
    
    res.send("blog inserted");
}

var userBlogs=async (req,res)=>{
    var data=await blogTable.findAll({
        attributes:[
            'blogId',
            'blogContent'
        ]
    })
    let response={
        data:data.filter(data=> data.blogId==req.user.id)
    }
    res.status(200).json(response);
}

var allBlogs=async (req,res)=>{
    var data =await blogTable.findAll({
        attributes:[
            'blogId',
            'blogContent'
        ]
    })
  
    let response={
        data:data
    }
    res.status(200).json(response);
}


var updateBlog=async (req,res)=>{
    const id=req.body.id;

    const data1=await blogTable.findOne({where:{id:id}});
    const blogMatchUser=await req.user.id==data1.blogId;
    if(blogMatchUser){
    var data=await blogTable.update({blogContent:req.body.blogContent},{
        where:{
            id:req.body.id
        }
    })
    let response={
        data:"blog is updated"
    }
    res.status(200).json(response);
}
}




var deleteBlog=async (req,res)=>{
    const id=req.body.id;

    const data1=await blogTable.findOne({where:{id:id}});
    const blogMatchUser=await req.user.id==data1.blogId;

    if(blogMatchUser){
        let data=blogTable.destroy({
            where:{
                id:id
            }
        })
    }
    else{
        res.send('this is not your post');
    }

    let response={
        data:'post delete'
    }
    res.status(200).json(response);
}

var blogById=async (req,res)=>{
    const id=req.body.id;

    const data1=await blogTable.findOne({where:{id:id}});
    const blogMatchUser=await req.user.id==data1.blogId;

    if(blogMatchUser){
        let response={
            data:data1.blogContent
        }
        res.status(200).json(response);
    }
    else{
        res.send('this is not your blog');
    }
}


module.exports={
    addBlog,
    allBlogs,
    userBlogs,
    updateBlog,
     deleteBlog,
    blogById,
}
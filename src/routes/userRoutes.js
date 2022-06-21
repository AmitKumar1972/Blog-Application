const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const userController=require('../Controller/userController');
const blogController=require('../Controller/blogController');
const db=require('../models');
const userTable=db.User;
const verifyToken=require('../middlewares/verifyToken');


router.post('/register',userController.addUser);

router.post('/login',async (req,res)=>{

    const username={
        email:req.body.email,
        password:req.body.password
    };

    const forId=await userTable.findOne({where:{email:username.email}});

    username.id=forId.id;

    const getUser=await userTable.findOne({
        where:{
            email:username.email
        }
    });

    if(!getUser){
        res.send('User Not Found');
    }

    let passwordMatch=username.password==getUser.password;

    if(!passwordMatch){
        res.send('password not match');
    }

    const token=jwt.sign(username,'AmitBishnoi',{expiresIn:'8h'});
    res.json({token});
})
router.post('/addblog',verifyToken,blogController.addBlog);
router.delete('/deleteblog',verifyToken,blogController.deleteBlog);
router.get('/feed',userController.oneToMany);
router.get('/blogById',verifyToken,blogController.blogById);
router.post('/updateBlog',verifyToken,blogController.updateBlog);
router.get('/profile',verifyToken,blogController.userBlogs);
router.post('/emailSend',userController.emailSend);


module.exports=router;
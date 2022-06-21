const express=require('express');
const router=express.Router();
const userController=require('../Controller/userController');
const blogController=require('../Controller/blogController');
const verifyToken=require('../middlewares/verifyToken');



module.exports=router;
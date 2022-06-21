const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const userRoutes=require('./userRoutes')
const blogRoutes=require('./blogRoutes')

router.use('/users',userRoutes);
router.use('/blogs',blogRoutes);

// router.use('/',userRoutes);

module.exports = router;
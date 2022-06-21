const jwt=require('jsonwebtoken');

module.exports=function verifyToken(req,res,next){
    const header=req.headers['authorization'];
    const bearerToken=header.split(' ')[1];

    jwt.verify(bearerToken,'AmitBishnoi',(err,user)=>{
        if(err){
            return res.json(err.message);
        }
        req.user=user;
        next();
    })
}
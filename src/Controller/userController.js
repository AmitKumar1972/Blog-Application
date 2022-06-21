const db=require('../models');
const userTable=db.User;
const blogTable=db.Blog;
const validator=require('../Validators/validator');
const mailSender=require('@sendgrid/mail');

var allUser=async (req,res)=>{
    var data =await userTable.findAll({
        attributes:[
            'id',
            'name',
            'email'
        ]
    })
  
    let response={
        data:data
    }
    res.status(200).json(response);
}


var addUser=async (req,res)=>{
    let nameValidate=validator.nameValidator(req.body.name);
    let passwordValidate=validator.passwordValidator(req.body.password);
    let emailValidate=validator.emailValidator(req.body.email);

    if(nameValidate && passwordValidate && emailValidate){
    let data=await userTable.build({userId:req.body.id,name:req.body.name,email:req.body.email,password:req.body.password});
    await data.save();

    res.send("data inserted");
    }
    else{
        res.send('check name password email correctly');
    }
}

var oneToMany=async (req,res)=>{
    let data=await userTable.findAll({
        include:[{
            model:blogTable,
            attributes:[
                'blogContent'
            ]
    }],
        attributes:[
            'name'
        ]
    });
    let response={
        data:data
    }
    res.status(200).json(response);
}


var emailSend=async (req,res)=>{
    const API_KEY='Amit';
    mailSender.setApiKey(API_KEY);
    let message={
        to:'amitk@gluelabs.com',
        from:'amitgodara1008@gmail.com',
        subject:'my first sendgrid Mail',
        text:'hello people'
    }

    mailSender.send(message).then(res=>{
        console.log('email sent successfully');
    }).catch((error)=>{
        console.log(error.message);
    })
    
}


module.exports={
    addUser,
     allUser,
     oneToMany,
     emailSend
}
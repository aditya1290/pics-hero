const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./models/Users');
const Post = require('./models/post');


//Dotenv configuration
dotenv.config();


//Database connection
mongoose.connect(process.env.MONGODB,{ useNewUrlParser: true , useUnifiedTopology: true },()=>{
    console.log("DB connected");
});


router.get('/',(req,res)=>{
    res.redirect('/');
});

//Router REGISTER PAGE GET
router.get('/register',(req,res)=>{
    res.render('index',{
        error1 : undefined,
        SuccessMsg : undefined,
        registerCode : 1
    });
});


//Router Login page GET
router.get('/login', (req,res)=>{
    res.render('index',{
        error1 : undefined,
        SuccessMsg : undefined,
        registerCode: 0
    });
});

//Router REGISTER PAGE POST
router.post('/register',async (req,res)=>{
    
    const emailexists = await User.findOne({Email : req.body.Email});
    const UserExists = await User.findOne({Username : req.body.Username});

    if(emailexists)
    {
        res.render('index',{
            error1:"This Email is already registered",
            SuccessMsg : undefined,
            registerCode : 1
        });
    }

    if(UserExists)
    {
        res.render('index',{
            error1: "Username already taken",
            SuccessMsg : undefined,
            registerCode : 1
        });
    }

    console.log(req.body);

    //Everything looks fine --> Register person

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.Password,salt);

    //Save it in database
    const newUser = new User( {
        Username : req.body.Username,
        Email : req.body.Email,
        Password : hashPass
     });

    try{
        const savedUser = await newUser.save();
        console.log(savedUser);
        
        res.render('index',{
            error1:undefined,
            SuccessMsg: "Account created. Log in now",
            registerCode : 0
        });
    }
    catch(err)
    {
        res.render('index',{
            error1:"any error occured",
            SuccessMsg : undefined,
            registerCode : 1
        });
    }

});

router.use(express.static(path.join(__dirname, 'views')));

//Router LOGIN PAGE POST
router.post('/login',async (req,res)=>{

    const userexists = await User.findOne({Email : req.body.Email});
    if(userexists)
    {   
        const validPass = await bcrypt.compare(req.body.Password, userexists.Password);
        if(!validPass)
        {
            res.render('index',{
                error1:"No user found",
                SuccessMsg : undefined,
                registerCode : 0
            });
        }
        else
        {   
            const PostContent =  await Post.find({}).sort('-timeline').limit(10);
            var PostList = [];
            for(var i=0;i<PostContent.length; i++)
            {
                PostList.push(PostContent[i]._id);
            }
            res.cookie('__id123', userexists._id);
            res.redirect('/');
        }
    }
    else
    {
        res.render('index',{
            error1:"No user found",
            SuccessMsg : undefined,
            registerCode : 0
        });
    }
});










module.exports = router;
const express = require('express');
const router = express.Router();
const cookiePareser = require('cookie-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/Users');
const bodyparser = require('body-parser');


//Middlewares
router.use(cookiePareser());
router.use(express.urlencoded({extended:false}));

router.get('/',async (req,res)=>{
    var id = req.cookies['__id123'];
    const x = await User.findOne({ _id: id });
    
    if(x)
    {
        const y = '/profile/' + x.Username;
        res.redirect(y);
    }
    else
    {
        res.redirect('/auth/register');
    }
});

router.get('/:id',async (req,res)=>{

    var name = req.params.id;
    const userxxx = await User.findOne({Username : name});

    if(!req.cookies['__id123'])
    {
        res.redirect('/');
    }

    const currentUser = await User.findOne({_id : req.cookies['__id123']});

    if(!currentUser)
    {
        res.redirect('/');
    }

    //No account found
    if(!userxxx)
    {
        res.render('error404');
    }
    else
    {
        const postList = userxxx.PostId;
        var postContent = await Post.find({_id: {$in: postList}}).sort('-timeline');
        
        if(name == currentUser.Username)
        {
            //Watching own profile
            res.render('MainProfile',{
                activeUser : currentUser,
                name : currentUser.Username,
                userPass : userxxx,
                postList : userxxx.PostId,
                postContent : postContent, 
                me : 1
            });
        }
        else
        {
            //Watching others profile
            res.render('MainProfile',{
                activeUser : currentUser,
                name : currentUser.Username,
                userPass : userxxx,
                postList : userxxx.PostId,
                postContent : postContent,
                me  : 0
            });
        }
    }
});



router.post('/',async (req,res)=>{

    const id1 = req.cookies['__id123'];
    const userxxx = await User.findOne({_id : id1});
    var namexxx = userxxx.Username;
    const z = userxxx.PostsCount + 1;
    var url = '/users/'+namexxx + '/' + z + '.jpg';
    const newPost = new Post({author : id1, authorName : namexxx , caption : req.body.PostCaption,postimg : url});
    
    try
    {
        const savedPost = await newPost.save();
        console.log("Post saved");
        await User.updateOne(
            { _id: id1 },
            { $push: { PostId: savedPost._id }, $inc : {PostsCount : 1} },
            console.log("comepleted")
        );

        console.log("post saved successfully");
        const x = '/profile/'+namexxx;
        console.log("redirected to /profile/aytida");
        res.redirect(x);
    }
    catch(err)
    {
        console.log(err);
    }
    
});



router.post('/editBio',async(req,res)=>{

    const bio = req.body.bio;
    console.log(bio);
    try{
        await User.updateOne({_id : req.cookies['__id123']},{$set : {Bio : bio}});
        const x = await User.findOne({_id: req.cookies['__id123']});
        console.log(x);
    }catch(err)
    {
        console.log(err);
    }
    
});

router.post('/follow',async(req,res)=>{
    const person = req.body.person;
    try{
        const x = await User.findOne({_id : req.cookies['__id123']});
        await User.updateOne({_id : req.cookies['__id123']}, {$push : {Following : person}});
        await User.updateOne({Username : person},{$push : {Followers : x.Username}});
        console.log("followed");
        return res.json({a : 6});
    }catch(err)
    {
        console.log(err);
    }
});

router.post('/followDown',async(req,res)=>{
    const person = req.body.person;
    try{
        const x = await User.findOne({_id : req.cookies['__id123']});
        await User.updateOne({_id : req.cookies['__id123']}, {$pull : {Following : person}});
        await User.updateOne({Username : person},{$pull : {Followers : x.Username}});
        console.log("follow Down");
        return res.json({a : 5});
    }catch(err)
    {
        console.log(err);
    }
});


module.exports = router;
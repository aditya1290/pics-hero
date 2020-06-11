const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./models/Users');
const Post = require('./models/post');

app.set('views','views')
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'views')));

app.use(cookieParser());


// First Page
app.get('/',async (req,res)=>{
    
    if(req.cookies['__id123'])
    {
        const x = req.cookies['__id123'];
        const activeUser = await User.findOne({ _id :  x});
        
        if(activeUser)
        {
            const PostContent =  await Post.find({}).sort('-timeline').limit(40);
            console.log(PostContent);

            var PostList = [];
            for(var i=0;i<PostContent.length; i++)
            {
                PostList.push(PostContent[i]._id);
            }
            console.log(PostList);

            res.render('feed',{
                activeUser : activeUser,
                name : activeUser.Username,
                postContent : PostContent,
                postList : PostList
            });
        }
        else
        {
            res.render('index',{
                error1:undefined,
                SuccessMsg : undefined,
                registerCode : 1
            });
        }

    }
    else
    {
        res.render('index',{
            error1:undefined,
            SuccessMsg : undefined,
            registerCode : 1
        });
    }
});


app.use(express.urlencoded({extended:false}));


app.use('/auth',require('./users'));

app.use('/create',require('./CreatePost'));

app.use('/profile',require('./profile'));

app.use('/posts', require('./posts'));

app.use('/search',require('./search'));


app.get('/logout',async(req,res)=>{
    res.clearCookie("__id123");
    res.redirect('/');
});

app.post('/likeup',async(req,res)=>{

    const x = req.body.postId;
    const Username1 = await User.findOne({_id : req.cookies['__id123']});
    
    try{
        await Post.updateOne({_id : x},{$inc : {likesCount : 1},$addToSet : {likesUserId : Username1.Username}  });
        console.log("like upgraded");
        return res.json({'a' : '1'});
    }catch(err)
    {
        console.log(err);
        return res.json({'a' : '1'});
    }

});
app.post('/likedown',async(req,res)=>{
    const x = req.body.postId;
    const Username1 = await User.findOne({_id : req.cookies['__id123']});

    try{
        await Post.updateOne({_id : x}, {$inc : {likesCount : -1}, $pull : {likesUserId : Username1.Username}});
        console.log("like downgraded");
        return res.json({'a' : '1'});
    }catch(err){
        console.log(err);
        return res.json({'a' : '1'});
    }
});

app.post('/bookmark',async(req,res)=>{
    const x = req.body.postId;
    
    try{
        await User.updateOne({_id : req.cookies['__id123']},{$push : {bookmarkList : x}});
        console.log("Bookmrked");
        return res.json({'a'  :'1'});
    }catch(err){
        console.log(err);
        return res.json({'a':'0'});
    }
});

app.post('/bookmarkD',async(req,res)=>{
    const x = req.body.postId;
    
    try{
        await User.updateOne({_id : req.cookies['__id123']},{$pull : {bookmarkList : x}});
        console.log("De Bookmrked");
        return res.json({'a'  :'3'});
    }catch(err){
        console.log(err);
        return res.json({'a':'2'});
    }
});

app.post('/AjaxP',async(req,res)=>{
    var z = JSON.parse(req.body.LMPFull);
    console.log(z);
    console.log(typeof z);
    console.log(typeof z[0]);
    var skip = parseInt(req.body.LMP);
    let objectIdArray = z.map(s => mongoose.Types.ObjectId(s));
    var postContent1 = await Post.find({_id: {$in: objectIdArray}}).sort('-timeline').skip(skip).limit(2);
    return res.json({'postContent' : postContent1, LMP : skip+1 });
});


app.listen(process.env.PORT,()=>{
    console.log("Server started successfully...");
});
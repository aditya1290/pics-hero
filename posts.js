const express = require('express');
const router = express.Router();
const Post = require('./models/post');


router.get('/',(req,res)=>{
    res.redirect('/');
});

router.get('/:id',async (req,res)=>{
    const x = await Post.findOne({_id : req.params.id});
    if(x)
    {
        res.render('SinglePostPage',{
            postModel : x,
            id : req.params.id
        });
    }
    else
    {
        res.render('error404');
    }
});

module.exports = router;
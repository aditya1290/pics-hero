const express = require('express');
const router = express.Router();
const cookieparser = require('cookie-parser');
const User = require('./models/Users');

router.get('/',async (req,res)=>{

    if(req.cookies['__id123'])
    {
        const z = req.cookies['__id123'];
        const aq = await User.findOne({_id : z});
        res.render('CreatePost',{
            name : aq.Username,
            postc : aq.PostsCount+1
        });
    }
    else
    {
        console.log("Ye to bina cookie k aa gya");
        res.redirect('/auth/register');
    }
});


module.exports = router;
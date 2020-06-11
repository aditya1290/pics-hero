const express = require('express');
const router = express.Router();
const User = require('./models/Users');



router.post('/:text',async(req,res)=>{
    const text = req.params.text;
    if(text!='')
    {
        const x = await User.find({Username :  new RegExp('^' + text , 'i') },{Username : 1});
        return res.json({data : x});
    }
});

module.exports = router;
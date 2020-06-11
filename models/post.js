const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
    authorName : {
        type : String,
        required : true
    },
    postimg : {
        type : String
    }
    ,
    caption : {
        type : String,
    },
    likesCount : {
        type : Number,
        default : 0
    },
    timeline : {
        type : Date,
        default : Date.now
    },
    likesUserId : [{
        type : String
    }]
});

module.exports  = mongoose.model('Post',postSchema);
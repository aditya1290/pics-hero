const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    Username : {
        type:String,
        required:true,
        unique:true
    },
    Email : {
        type: String,
        required:true,
        unique:true
    },
    Password : {
        type:String,
        required:true,
    },
    PostsCount : {
        type:Number,
        default:0
    },
    PostId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Post'
    }],
    DateMade : {
        type: Date,
        default : Date.now
    },
    Followers: [{
        type: String
        
    }],
    Following : [{
        type : String
    }],

    FollowersCount : {
        type:Number,
        default:0
    },
    FollowingCount : {
        type: Number,
        default: 0
    },
    Bio : {
        type : String,
        default: "Bio here"
    },
    Profimg : {
        type : String
    },
    Coverimg:{
         type : String
    },
    bookmarkList : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
});

module.exports  = mongoose.model('User',userSchema);
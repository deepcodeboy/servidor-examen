const { model, Schema } = require('mongoose');

const modelUser = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    isActive: {
        type:Boolean,
        default:true
    },
    isAdmin: {
        type:Boolean,
        default:false
    }
    
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model("User", modelUser);




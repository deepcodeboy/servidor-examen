const { model, Schema } = require('mongoose');

const modelUser = new Schema({
    username:{
        type:String,
        required:true,
        min: 6,
        unique:true
    },
    password:{
        type:String,
        min: 8,
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
    rol: {
        type:String,
        default:'normal'
    }
    
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model("User", modelUser);





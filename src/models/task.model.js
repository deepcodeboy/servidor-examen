//MODELO TAREA
const {model, Schema} = require('mongoose');
require('../models/user.model');

const modelTask = new Schema({
    title:{
        type: 'string',
        max: 100,
        required: true
    },
    description:{
        type:'string',
        max: 255,
        required: true
    },
    isComplete:{
        type: Boolean,
        default: false
    },
    isActive:{
        type: Boolean,
        default: true
    },
    idUser:{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },

},{
    timestamps: true,
    versionKey: false
}

);

module.exports = model("Tasks", modelTask)

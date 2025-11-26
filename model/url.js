import mongoose, { Schema } from "mongoose"
const urlSchema = new Schema({
    codeId:{
        type: String,
        required: true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required: true
    },
    history:[{
        timestamp:{
            type: Number
        }
    }],
    
},{timestamps:true})

export const Url = mongoose.model('url',urlSchema);

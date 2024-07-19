import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    subject:{
        type: String,
        required: true
    }
},{
    versionKey: false
})

export default mongoose.model('Video', videoSchema)
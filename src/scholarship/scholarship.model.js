import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    description:{
        type: String,
        required: true
    }
},{
    versionKey: false
})

export default mongoose.model('scholarship', scholarshipSchema)
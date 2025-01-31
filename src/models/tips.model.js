import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const tipsSchema= new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    url:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    tags:{
        type:String,
        required:true
    }

})
tipsSchema.plugin(mongooseAggregatePaginate)
export const Tips=mongoose.model("Tips",tipsSchema)
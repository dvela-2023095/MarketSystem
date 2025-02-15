import { Schema,model } from "mongoose";

const categorySchema = Schema(
    {
        name:{
            type:String,
            required:[true,'Name of the category is required'],
            unique:true
        }
    },
    {
        timestamps: true
    }
)

export default model('Category',categorySchema)
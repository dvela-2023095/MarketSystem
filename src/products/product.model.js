import { Schema,model } from "mongoose";

const productSchema = Schema(
    {
        name:{
            type:String,
            required:[true,'Name is required'],
            unique:true,
            maxlength:[30,'Cant overcome 30 characters']
        },
        description:{
            type:String,
            required:[true,'Description is required'],
            maxlength:[200,'Cant overcome 200 characters']
        },
        price:{
            type:Number,
            required:[true,'Price is required']
        },
        stock:{
            type:Number,
            required:[true,'Stock is required'],
        },
        sales:{
            type:Number,
            required:[true, 'Sales are required']
        },
        category:{
            type:Schema.Types.ObjectId,
            ref:'Category',
            required:[true,'Category is required']
        }
    },
    {
        timestamps: true
    }
)

export default model('Products',productSchema)
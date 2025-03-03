import { Schema,model } from "mongoose";

const billSchema = Schema(
    {
        client:{
            type: Schema.Types.ObjectId,
            ref:'User'
        },
        products:{
            type:[
                {
                    product:{
                        type:Schema.Types.ObjectId,
                        ref:'Products',
                        required:[true,'Product is required']
                    },
                    amount:{
                        type:Number,
                        required:[true,'Amount is required']
                    },
                    subtotal:{
                        type:Number,
                        required:[true,'Subtotal is required']
                    }
                }
            ]
        },
        total:{
            type:Number,
            required:[true,'Total is required']
        }
    },
    {
        timestamps: true
    }
)

export default model('Bill',billSchema)
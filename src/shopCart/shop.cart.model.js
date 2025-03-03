import { Schema,model } from "mongoose";

const shopCartSchema = Schema(
    {
        owner:{
            type:Schema.Types.ObjectId,
            ref:'Users',
            required:[true,'Owner is required']
        },
        products:{
            type:[
                {
                    product:{
                        type:Schema.Types.ObjectId,
                        required:[true,'Product is required'],
                        ref:'Product'
                    },
                    amount:{
                        type:Number,
                        required:[true,'Amount is required']
                    }
                }
            ]
        }
    }
)

export default model('ShopCart',shopCartSchema)
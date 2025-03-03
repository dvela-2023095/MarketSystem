import Bill from "./bill.model.js"
import ShopCart from "../shopCart/shop.cart.model.js"
import Product from "../products/product.model.js"
export const confirmPurchase = async (req,res) => {
    try {
        let shopCart = await ShopCart.findOne({owner: req.user.uid})
        if(!shopCart) return res.status(400).send({success:false,message:'Shop cart not found'})
        let prodTotal = await crearLista(shopCart.products)
        let bill = new Bill({
            client:req.user.uid,
            products: prodTotal.list,
            total: prodTotal.total
        })

        let outOfStock = await actualizarStock(shopCart.products)
        if(outOfStock)return res.send({success:false,message:`Product ${outOfStock.name} don't have enougth stock, actual stock ${outOfStock.stock}`})
        await bill.save()
        shopCart.products = []
        await shopCart.save()
        return res.send({success:true,message:'Purchase made'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error confirming the purchase'})
    }
}

export const purchaseHitory = async(req,res)=>{
    try {
        const {skip=0,limit=20} = req.query
        let bills = await Bill.find({client:req.user.uid}).skip(skip).limit(limit).populate({path:'products.product',select:'-_id name'})
        if(bills.length===0) return res.status(400).send({success:false,message:'There is not bills to show'})
        return res.send({success:true,message:'Your bills',bills})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error showing your history'})
    }
}

const crearLista=async(products)=>{
    try {
        let list = []
        let total = 0
        for(const prod of products){
            let product = await Product.findById(prod.product.toString())
            let billProduct= {
                product: prod.product,
                amount:prod.amount,
                subtotal: product.price * prod.amount
            }
            list.push(billProduct)
            total = total + billProduct.subtotal
        }
        let bill = {
            list:list,
            total:total
        }
        return bill
    } catch (error) {
        console.error(error)
        throw new Error("General error making the bill");
        
    }
}
const actualizarStock = async(products)=>{
    try {
        for(const product of products){
            let prod = await Product.findById(product.product.toString())
            if(prod.stock < product.amount){
                let p ={
                    id:prod._id,
                    name:prod.name,
                    stock:prod.stock,
                }
                return p
            }else{
                prod.stock = prod.stock - product.amount
                await prod.save()
            }
        };
    } catch (error) {
        console.error(error)
        throw new Error('General error updating the stock');
        
    }
}
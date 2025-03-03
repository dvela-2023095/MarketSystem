import ShopCart from "./shop.cart.model.js";
import Product from "../products/product.model.js";
export const addToShopCart = async(req,res)=>{
    try {
        let {product, amount} = req.body
        if(!product || !amount) return res.send({success:false,message:'Product or amount dont found in the request'})
        let exist = await Product.findById(product)
        if(!exist) return res.status(400).send({success:false,message:'Product dont found'})
        let shopCart = await ShopCart.findOne({owner:req.user.uid})
        if(!shopCart){
            shopCart = new ShopCart({owner:req.user.uid,products:{product:product,amount:amount}})
            await shopCart.save()
            return res.send({success:true,message:'Product added'})
        }
        let alreadyExist = false
        shopCart.products.forEach(prod => {
            if(prod.product.toString() === product) alreadyExist = true 
        });
        if(alreadyExist === true) return res.send({success:false,message:'This product is already in your shop cart'})
        shopCart.products.push({product:product,amount:amount})
        await shopCart.save()
        return res.send({success:true,message:'Product added'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error adding the product to the shop cart'})
    }
}

export const changeAmount = async(req,res)=>{
    try {
        let {product,amount} = req.body
        if(!product || !amount) return res.send({success:false,message:'Product or amount dont found in the request'})
        let shopCart = await ShopCart.findOne({owner:req.user.uid})
        if(!shopCart) return res.status(400).send({success:false,message:'Shop cart not found'})
        let found = false
        shopCart.products.forEach(prod =>{
            if(prod.product.toString() === product){
                prod.amount = amount
                found = true
            }
        })
        if(found === false) return res.send({success:false,message:'Product not found'})
        await shopCart.save()
        return res.send({success:true,message:'Amount changed'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:'General error changing the amount'})
    }
}

export const deletefromShopCart = async(req,res)=>{
    try {
        let {product} = req.body
        if(!product) return res.send({success:false,message:'Product to delete not found in the request'})
        let shopCart = await ShopCart.findOne({owner:req.user.uid})
        if(!shopCart) return res.status(400).send({success:false,message:'Shop cart not found'})
        shopCart.products = await shopCart.products.filter(prod=>prod.product.toString() !== product)
        await shopCart.save()
        return res.send({success:true,message:'Product deleted form the shop cart'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error deleting the product from the shopcart'})
    }
}

export const seeShopCart = async(req,res)=>{
    try {
        let shopCart = await ShopCart.findOne({owner:req.user.uid})
        if(!shopCart) return res.status(400).send({success:false,message:'Shop cart not found'})
        let list =[]
        let total = 0
        let products = shopCart.products
        for(const product of products){
            let prod = await Product.findById(product.product.toString())
            let item={
                product:product.product,
                name:prod.name,
                price:prod.price,
                amount:product.amount
            }
            list.push(item)
            total = total + prod.price * product.amount
        }
        let info={
            products:list,
            total:total
        }
        return res.send({success:true,message:'Your cart',info})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:'General error showing the shop cart'})
    }
}
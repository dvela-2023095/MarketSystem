import Category from "../category/category.model.js";
import Product from "../products/product.model.js";
import User from "../Users/user.model.js";

export const listProducts = async(req,res)=>{
    try {
        const {limit=20,skip=0} = req.query
        let products = await Product.find().skip(skip).limit(limit)
        if(products.length===0) return res.status(404).send({success:false,message:'Producst not found'})
        products.sort((a,b)=>{
            return b.sales - a.sales
        })
        return res.send({success:true,message:'Products: ',products})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'Genelar error listing the products'})
    }
}

export const findByName = async(req,res)=>{
    try {
        let {productName} = req.body
        productName = productName.toLowerCase().trim()
        let products = await Product.find({name:{$regex:productName,$options:'i'}})
        if(!products) return res.status(404).send({success:false,message:'Products not found'})
        return res.send({success:true,message:'Products found:',products})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error searching the product'})
    }
}

export const exploreCategories = async(req,res)=>{
    try {
        const {skip=0,limit=20}=req.query
        let categories = await Category.find().skip(skip).limit(limit)
        return res.send({success:false,message:'Categories found: ',categories})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error showing the categories'})
    }
}

export const productByCategory = async (req,res) => {
    try {
        let{id} = req.params
        const {skip=0,limit=20}=req.query
        let products = await Product.find({category:id}).skip(skip).limit(limit)
        if(products.length===0)return res.status(400).send({success:false,message:'Products not found'})
        return res.send({success:true,message:'Products found: ',products})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error showing the products'})
    }
}

export const addToShopCart = async(req,res)=>{
    try {
        let {id,amount}=req.body
        let product = await Product.findById(id)
        if(!product) return res.send({success:false,message:'Product not found'})
        let subtotal = product.price * amount
        let producto = {
            id:id,
            amount:amount,
            subtotal:subtotal
        }
        await req.user.shopCart.push(producto)
        let {user}=req
        return res.send({success:true,message:'Product added to the cart'},user)
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error adding the product to the shopcart'})
    }
}
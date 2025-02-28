import Product from "../products/product.model.js";
import User from "../users/user.model.js";

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
        let productos = await Product.filter()
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error searching the product'})
    }
}
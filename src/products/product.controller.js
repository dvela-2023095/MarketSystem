import Product from "../products/product.model.js";

export const addProduct = async(req,res)=>{
    try{
        let data =req.body
        let product = new Product(data)
        product.sales = 0
        await product.save()
        return res.send({success:true,message:'Product saved successfully'})
    }catch(error){
        console.error(error)
        return res.status(500).send({success:false,message:'General error adding the product'})
    }
}

export const listProducts =async(req,res)=>{
    try {
        const { limit = 20, skip = 0 } = req.query
        let products = await Product.find().skip(skip).limit(limit).populate({path:'category',select:'name'})
        if(products.length===0)return res.status(404).send({success:false,message:'Products not found'})
        return res.send({success:true,message:'Products found:',products})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error listing the products'})
    }
}

export const listProduct =async(req,res)=>{
    try {
        const {id} = req.params
        let product = await Product.findById(id).populate({path:'category', select:'name'})
        if(!product)return res.status(404).send({success:false,message:'Product not found'})
        return res.send({success:true,message:'Product found:',product})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error searching the product'})
    }
}

export const updateProduct =async(req,res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let product = await Product.findByIdAndUpdate(id,data,{new:true})
        if(!product) return res.send({success:false,message:'Product not found'})
        return res.send({success:true,message:'Product updated'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error updating the product'})
    }
}

export const deleteProduct =async(req,res)=>{
    try {
        let {id}=req.params
        let product = await Product.findByIdAndDelete(id)
        if(!product) return res.status(404).send({success:false,message:'Product not found'})
        return res.send({success:true,message:'Product deleted successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error deleting the product'})
    }
}
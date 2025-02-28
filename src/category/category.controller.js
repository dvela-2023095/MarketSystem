import Category from "./category.model.js";
import Product from "../products/product.model.js";
export const addCategory = async(req,res)=>{
    try {
        let data = req.body
        let cat = new Category(data)
        await cat.save()
        return res.send({success:true,message:'Category added'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General Error adding the Category'})
    }
}

export const listCategories = async(req,res)=>{
    try {
        const {limit = 20,skip=0} = req.query
        let categories = await Category.find().skip(skip).limit(limit)
        if(categories.length===0) return res.status(404).send({success:false,message:'Categories not found'})
        return res.send({success:true,message:'Categories found:',categories})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General Error showing the Categories'})
    }
}

export const findCategory = async(req,res)=>{
    try {
        let {id} = req.params
        let category = await Category.findById(id)
        if(!category) return res.status(404).send({success:false,message:'Category not found'})
        return res.send({success:true, message:'Category found: ',category})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error searching the Category'})
    }
}

export const updateCategory = async(req,res)=>{
    try {
        let {id}=req.params
        let data = req.body
        let category = await Category.findByIdAndUpdate(id,data,{new:true})
        if(!category) return res.status(404).send({success:false,message:'Category not found'})
        return res.send({success:true,message:'Category updated successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error updating the Category'})
    }
}

export const deleteCategory = async(req,res)=>{
    try {
        let {id}=req.params
        let category = await Category.findById(id)
        if(!category) return res.status(404).send({success:false,message:'Category not found'})
        if(category.name === 'Productos Varios') return res.send({success:false,message:`Can't delete a default category`})
        category =await Category.findByIdAndDelete(id)
        let catGeneral = await Category.findOne({name:'Productos Varios'})
        await Product.updateMany({category:category._id},{category:catGeneral._id},{new:true})
        return res.send({success:true,message:'Category deleted'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error deleting the Category'})
    }
}
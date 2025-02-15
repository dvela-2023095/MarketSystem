import User from "../Users/user.model.js";
import { checkPassword, encrypt } from "../../utils/encrypt.js";
import Product from "../products/product.model.js";
import Category from "../category/category.model.js";
//Usuarios
export const addUser = async(req,res)=>{
    try {
        let {user} = req
        let data = req.body
        let usuario = new User(data)
        usuario.password = await encrypt(usuario.password)
        usuario.status = true
        await usuario.save()
        return res.send({success:true,message:'User successfully added'})
    } catch (error) {
        console.log(errror)
        return res.status(500).send({success:false,message:'General Error registerin the user'})
    }
}

export const listUsers = async(req,res)=>{
    try{
        const { limit = 20, skip = 0 } = req.query
        const users = await User.find({status:true}).skip(skip).limit(limit)
        if(users.length===0) return res.status(404).send({success:false,message:'There is no Users'})
        return res.send({success:true,message:'Users found: ',users})
    }catch (error){
        console.log(errror)
        return res.status(500).send({success:false,message:'General Error registerin the user'})
    }
}

export const findUser = async(req,res)=>{
    try{
        let {id}=req.params
        let user = await User.findById(id)
        if(!user)return res.status(404).send({success:false,message:'User not found'})
        return res.send({success:true,message:'User found:',user})
    }catch(error){
        console.log(error)
        return res.status(500).send({success:false,message:'General error seaching the user'})
    }
}

export const updateUser = async(req,res)=>{
    try {
        let {uid}=req.user
        let data = req.body
        let user = await User.findByIdAndUpdate(uid,(
            {
                name:data.name,
                surname:data.surname,
                username:data.username,
                email:data.email,
                phone:data.phone
            }),
            {new:true})

        if(!user) return res.status(404).send({success:true,message:'User not found'})
        return res.send({success:true,message:'User updated successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:'General error seaching the user'})
    }
}

export const deleteUser = async(req,res)=>{
    try {
        let {id}=req.params
        let {adminPassword}=req.body
        let admin = await User.findById(req.user.uid)
        if(!adminPassword) return res.send({success:false,message:'Need the admin password to delete the user'})
        if(admin && await checkPassword(admin.password,adminPassword)){
            let user = await User.findById(id)
            if(!user) return res.status(404).send({success:false,message:'User not found'})
            user.status = false
            await user.save()
            return res.send({success:true,message:'User deleted'})
        }
        return res.status(403).send({success:false,message:'Acces denied wrong password'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:'General Error deleting the user'})
    }
}
export const changeRol = async(req,res)=>{
    try {
        let {user} = req
        let {id} = req.params
        let {role}=req.body
        let usuario = await User.findByIdAndUpdate(id,({role:role}),{new:true})
        if(!usuario) return res.status(404).send({success:false,message:'User not found'})
        return res.send({success:true,message:'Role Changed'})
    } catch (error) {
        console.log(errror)
        return res.status(500).send({success:false,message:'General Error changing the role from the user'})
    }
}
//Categoria
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
        let category = await Category.findByIdAndDelete(id)
        let catGeneral = await Category.findOne({name:'Productos Varios'})
        if(!catGeneral){
            let cat = new Category({name:'Productos Varios'})
            await cat.save()
            catGeneral = await Category.findOne({name:'Productos Varios'})
        }
        if(!category) return res.status(404).send({success:false,message:'Category not found'})
        await Product.updateMany({category:category._id},{$push:{category:catGeneral._id}})
        await Product.updateMany({category:category._id},{$pull:{category:category._id}})
        return res.send({success:true,message:'Category deleted'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error deleting the Category'})
    }
}
//Productos
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
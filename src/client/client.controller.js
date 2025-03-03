import Category from "../category/category.model.js";
import Product from "../products/product.model.js";
import User from "../Users/user.model.js";
import { checkPassword, encrypt } from "../../utils/encrypt.js";
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

export const changePassword = async(req,res)=>{
    try {
        let {oldPassword,newPassword}= req.body
        let user = await User.findById(req.user.uid)
        if(!oldPassword || !newPassword) return res.send({success:false,message:'You must send the old and new password'})
        if(user && await checkPassword(user.password,oldPassword)){
            user.password = await encrypt(newPassword)
            user.save()
            return res.send({success:true,message:'Password changed'})
        }
        return res.send({success:false,message:'Wrong password'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error changing the password'})
    }
}

export const deleteProfile = async(req,res)=>{
    try {
        let {password}=req.body
        let user = await User.findById(req.user.uid)
        if(!password) return res.send({success:false,message:'Need the password to delete your profile'})
        if(user && await checkPassword(user.password,password)){
            return res.send({success: true,message: 'Are you sure you want to delete this user?(change the method to "put")',confirmUrl: `/v1/client/confirm-delete/${user._id}`})
        }
        return res.status(403).send({success:false,message:'Acces denied wrong password'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:'General Error deleting the user'})
    }
}

export const deleteConfirmed = async(req,res)=>{
    try {
        let {id}=req.params
        if(id!==req.user.uid) return res.send({success:false,message:'This is not your porfile'})
        let user = await User.findById(id)
        user.status = false,
        await user.save()
        return res.send({success:true,message:'User deleted'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error deleting the profile'})
    }
}
export const viewProfile =async (req,res) => {
    try {
        let user = await User.findById(req.user.uid,'-_id name surname username email phone')
        if(!user) return res.send({success:false,message:'User not found'})
        return res.send({success:true,message:'Profile: ',user})
    } catch (error) {
        console.error(error)
        return res.status(500).send({success:false,message:'General error showing the profile'})
    }
}
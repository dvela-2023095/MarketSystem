import { isValidObjectId } from "mongoose"
import User from "../src/Users/user.model.js"
import Product from "../src/products/product.model.js"
import Category from "../src/category/category.model.js"
export const existsUser = async(username)=>{
    const alreadyExists = await User.findOne({username})
    if(alreadyExists){
        console.error(`The username ${username} is already taken`)
        throw new Error(`The username ${username} is already taken`)
    }
}
export const existsEmail = async(email)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}
export const existProduct = async(name)=>{
    const product = await Product.findOne({name:name})
    if(product){
        console.error(`The product ${name} already exist`)
        throw new Error(`The product ${name} already exist`)
    }
}
export const existCategory = async(id)=>{
    let exist = await Category.findById(id)
    if(!exist){
        console.error(`Category not found`)
        throw new Error('Category not found');
        
    }
}
export const uniqueCategory = async(name)=>{
    let cat = await Category.findOne({name:name})
    if(cat) throw new Error('This Category already exist');
    
}

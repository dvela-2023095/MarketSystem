import Category from "../src/category/category.model.js";
import User from "../src/Users/user.model.js";
import { encrypt } from "./encrypt.js";

export const alreadyExist=async()=>{
    let user = await User.findOne(
        {
            name:'Pedro',
            surname:'Armas',
            username:'parmas',
            email:'parmas@gmail.com',
            role:'ADMIN'
        })
    let cat = await Category.findOne({name:'Productos Varios'})
    if(!user) createAdmin()
    if(!cat) createCategory()
}
const createAdmin = async()=>{
    let user = new User(
        {
            name:'Pedro',
            surname:'Armas',
            username:'parmas',
            email:'parmas@gmail.com',
            password:await encrypt('ElGoat123@'),
            phone:'+502 4569-5435',
            role:'ADMIN',
            status:true
        })
    user.save() 
}
const createCategory = async()=>{
    let cat = new Category(
        {
            name:'Productos Varios'
        }
    )
    cat.save()
}
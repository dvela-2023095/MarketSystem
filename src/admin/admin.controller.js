import User from "../Users/user.model.js";
import { checkPassword, encrypt } from "../../utils/encrypt.js";

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

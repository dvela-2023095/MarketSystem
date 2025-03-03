import User from "../Users/user.model.js";
import { encrypt,checkPassword } from "../../utils/encrypt.js";
import { generateJwt } from "../../utils/jwt.js";

export const register = async(req,res)=>{
    try {
        let data = req.body
        let usuario = new User(data)
        usuario.password = await encrypt(usuario.password)
        usuario.role = 'CLIENT'
        await usuario.save()
        return res.send({success:true,message:'User successfully added'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:'General Error registerin the user'})
    }
}
export const login = async(req,res)=>{
    try {
        let { username,password } = req.body
        let user = await User.findOne({username})
        if(user.status === false) return res.send({succcess:false,message:'This profile was deleted'})
        if(user && await checkPassword(user.password, password)){
            let loggedUser={
                uid: user._id,
                username: user.username,
                name:user.name,
                role:user.role
            }
            let token =await generateJwt(loggedUser)
            return res.send({message: `Welcome ${user.name}`, loggedUser, token})
        }
        return res.status(400).send({message:'Invalid Credentials'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({messsage:'General error whith login function',error})
    }
}
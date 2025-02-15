'use strict'
import  jwt  from "jsonwebtoken"
export const validateJwt = async(req,res,next)=>{
    try {
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send({message: 'Unautorized'})
        let user = jwt.verify(authorization, secretKey)
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Invalid credentials'})
    }
}

export const isAdmin = async(req,res,next)=>{
    try {
        const {user} =req
        if(!user || user.role !== 'ADMIN') return res.status(403).send({success:false,message:`You dont have access| username ${user.username}`})
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({success:false,message: 'Error whit authorization'})
    }
}

export const isClient = async(req,res,next)=>{
    try {
        const {user}=req
        if(!user || user.role !== 'CLIENT') return res.status(403).send({success:false,message:`You dont have access| username ${user.username}`})
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({success:false,message:'Error whit authorization'})
    }
}
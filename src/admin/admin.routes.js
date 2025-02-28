import { Router } from "express";
import { addUser, changeRol, deleteUser, findUser, listUsers, updateUser } from "./admin.controller.js";
import { updateUserValidator, userValidator } from "../../middlewares/validations.js";
import { isAdmin, validateJwt } from "../../middlewares/validateJwt.js";
import { limiter } from "../../middlewares/rate.limit.js";

let api = Router()
//Usuarios
api.post('/addUser',[validateJwt,isAdmin,limiter,userValidator],addUser)
api.get('/users',[validateJwt,isAdmin,limiter],listUsers)
api.get('/getUser/:id',[validateJwt,isAdmin,limiter],findUser)
api.put('/updateProfile',[validateJwt,isAdmin,limiter,updateUserValidator],updateUser)
api.delete('/deleteUser/:id',[validateJwt,isAdmin,limiter],deleteUser)
api.put('/change-rol/:id',[validateJwt,isAdmin,limiter],changeRol)
export default api
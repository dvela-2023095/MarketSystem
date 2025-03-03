import { Router } from "express";
import { addUser, changeRol, deleteUser, findUser, listUsers, updateUser } from "./admin.controller.js";
import { updateUserValidator, userValidator } from "../../middlewares/validations.js";
import { isAdmin, validateJwt } from "../../middlewares/validateJwt.js";
import { limiter } from "../../middlewares/rate.limit.js";
import { changePassword } from "../client/client.controller.js";

let api = Router()
//Usuarios
api.post('/add-user',[validateJwt,isAdmin,limiter,userValidator],addUser)
api.get('/users',[validateJwt,isAdmin,limiter],listUsers)
api.get('/get-user/:id',[validateJwt,isAdmin,limiter],findUser)
api.put('/update-profile',[validateJwt,isAdmin,limiter,updateUserValidator],updateUser)
api.delete('/delete-user/:id',[validateJwt,isAdmin,limiter],deleteUser)
api.put('/change-rol/:id',[validateJwt,isAdmin,limiter],changeRol)
api.put('/change-password',[validateJwt,isAdmin,limiter],changePassword)
export default api
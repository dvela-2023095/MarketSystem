import { Router } from "express";
import {  isClient, validateJwt } from "../../middlewares/validateJwt.js";
import {  changePassword, deleteConfirmed, deleteProfile, exploreCategories, findByName, listProducts, productByCategory, viewProfile } from "./client.controller.js";
import { limiter } from "../../middlewares/rate.limit.js";
import {updateUser} from "../admin/admin.controller.js"
import {updateUserValidator} from "../../middlewares/validations.js"
const api = Router()

api.get('/products',[validateJwt,isClient,limiter],listProducts)
api.get('/find-products',[validateJwt,isClient, limiter],findByName)
api.get('/categories',[validateJwt,isClient,limiter],exploreCategories)
api.get('/products/:id',[validateJwt,isClient,limiter],productByCategory)

api.put('/change-profile',[validateJwt,isClient,updateUserValidator,limiter],updateUser)
api.put('/change-password',[validateJwt,isClient,limiter],changePassword)
api.get('/delete-profile',[validateJwt,isClient,limiter],deleteProfile)
api.put('/confirm-delete/:id',[validateJwt,isClient,limiter],deleteConfirmed)
api.get('/profile',[validateJwt,isClient,limiter],viewProfile)
export default api
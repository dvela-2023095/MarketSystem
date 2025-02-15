import { Router } from "express";
import { addCategory, addProduct, addUser, deleteCategory, deleteProduct, deleteUser, findCategory, findUser, listCategories, listProduct, listProducts, listUsers, updateCategory, updateProduct, updateUser } from "./admin.controller.js";
import { categoryValidator, productValidator, updateProductValidator, updateUserValidator, userValidator } from "../../middlewares/validations.js";
import { isAdmin, validateJwt } from "../../middlewares/validateJwt.js";
import { limiter } from "../../middlewares/rate.limit.js";

let api = Router()
//Usuarios
api.post('/addUser',[validateJwt,isAdmin,limiter,userValidator],addUser)
api.get('/users',[validateJwt,isAdmin,limiter],listUsers)
api.get('/getUser/:id',[validateJwt,isAdmin,limiter],findUser)
api.put('/updateProfile',[validateJwt,isAdmin,limiter,updateUserValidator],updateUser)
api.delete('/deleteUser/:id',[validateJwt,isAdmin,limiter],deleteUser)
//Categorias
api.post('/addCategory',[validateJwt,isAdmin,limiter,categoryValidator],addCategory)
api.get('/categories',[validateJwt,isAdmin,limiter],listCategories)
api.get('/getCategory/:id',[validateJwt,isAdmin,limiter],findCategory)
api.put('/updateCategory/:id',[validateJwt,isAdmin,limiter,categoryValidator],updateCategory)
api.delete('/deleteCategory/:id',[validateJwt,isAdmin,limiter],deleteCategory)
//Productos
api.post('/addProduct',[validateJwt,isAdmin,limiter,productValidator],addProduct)
api.get('/products',[validateJwt,isAdmin,limiter],listProducts)
api.get('/getProduct/:id',[validateJwt,isAdmin,limiter],listProduct)
api.put('/updateProduct/:id',[validateJwt,isAdmin,limiter,updateProductValidator],updateProduct)
api.delete('/deleteProduct/:id',[validateJwt,isAdmin,limiter],deleteProduct)
export default api
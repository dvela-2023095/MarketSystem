import { Router } from "express";
import { addProduct,listProducts,listProduct,updateProduct,deleteProduct } from "./product.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validateJwt.js";
import { limiter } from "../../middlewares/rate.limit.js";
import { productValidator,updateProductValidator } from "../../middlewares/validations.js";
const api = Router()

api.post('/add',[validateJwt,isAdmin,limiter,productValidator],addProduct)
api.get('/',[validateJwt,isAdmin,limiter],listProducts)
api.get('/get/:id',[validateJwt,isAdmin,limiter],listProduct)
api.put('/update/:id',[validateJwt,isAdmin,limiter,updateProductValidator],updateProduct)
api.delete('/delete/:id',[validateJwt,isAdmin,limiter],deleteProduct)

export default api
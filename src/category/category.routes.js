import { Router } from "express";
import { addCategory,listCategories,findCategory,updateCategory,deleteCategory } from "./category.controller.js";
import { categoryValidator,updatedCategoryValidator } from "../../middlewares/validations.js";
import { isAdmin, validateJwt } from "../../middlewares/validateJwt.js";
import { limiter } from "../../middlewares/rate.limit.js";

let api = Router()

api.post('/add',[validateJwt,isAdmin,limiter,categoryValidator],addCategory)
api.get('/',[validateJwt,isAdmin,limiter],listCategories)
api.get('/get/:id',[validateJwt,isAdmin,limiter],findCategory)
api.put('/update/:id',[validateJwt,isAdmin,limiter,updatedCategoryValidator],updateCategory)
api.delete('/delete/:id',[validateJwt,isAdmin,limiter],deleteCategory)

export default api
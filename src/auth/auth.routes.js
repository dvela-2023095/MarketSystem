import { Router } from "express";
import { userValidator } from "../../middlewares/validations.js";
import { login, register } from "./auth.controller.js";
import { limiter } from "../../middlewares/rate.limit.js";


const api = Router()

api.post('/register',[userValidator,limiter],register)
api.post('/login',limiter,login)
export default api
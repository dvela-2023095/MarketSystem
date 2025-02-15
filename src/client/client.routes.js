import { Router } from "express";
import { isClient, validateJwt } from "../../middlewares/validateJwt.js";
import { findByName, listProducts } from "./client.controller.js";

const api = Router()

api.get('/products',[validateJwt,isClient],listProducts)
api.get('/findProducts',[validateJwt,isClient],findByName)
export default api
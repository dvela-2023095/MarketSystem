import { Router } from "express";
import {  isClient, validateJwt } from "../../middlewares/validateJwt.js";
import { addToShopCart, exploreCategories, findByName, listProducts, productByCategory } from "./client.controller.js";
import { limiter } from "../../middlewares/rate.limit.js";

const api = Router()

api.get('/products',[validateJwt,isClient,limiter],listProducts)
api.get('/findProducts',[validateJwt,isClient, limiter],findByName)
api.get('/categories',[validateJwt,isClient,limiter],exploreCategories)
api.get('/products/:id',[validateJwt,isClient,limiter],productByCategory)
api.put('/addShop',[validateJwt,isClient,limiter],addToShopCart)
export default api
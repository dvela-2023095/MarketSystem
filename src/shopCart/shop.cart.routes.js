import { Router } from "express";
import { isClient, validateJwt } from "../../middlewares/validateJwt.js";
import { limiter } from "../../middlewares/rate.limit.js";
import { addToShopCart, changeAmount, deletefromShopCart, seeShopCart } from "./shop.cart.controller.js";

const api = Router()
api.post('/add-to-cart',[validateJwt,isClient,limiter],addToShopCart)
api.put('/update-amount',[validateJwt,isClient,limiter],changeAmount)
api.delete('/delete',[validateJwt,isClient,limiter],deletefromShopCart)
api.get('/see',[validateJwt,isClient,limiter],seeShopCart)
export default api
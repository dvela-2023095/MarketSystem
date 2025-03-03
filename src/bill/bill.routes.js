import { Router } from "express";
import { isAdmin, isClient, validateJwt } from "../../middlewares/validateJwt.js";
import { limiter } from "../../middlewares/rate.limit.js";
import { confirmPurchase, purchaseHitory, updateBill } from "./bill.controller.js";

const api = Router()

api.post('/add',[validateJwt,isClient,limiter],confirmPurchase)
api.get('/get',[validateJwt,isClient,limiter],purchaseHitory)
api.put('/update-bill',[validateJwt,isAdmin,limiter],updateBill)
export default api
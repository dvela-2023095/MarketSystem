import { Router } from "express";
import { isClient, validateJwt } from "../../middlewares/validateJwt.js";
import { limiter } from "../../middlewares/rate.limit.js";
import { confirmPurchase, purchaseHitory } from "./bill.controller.js";

const api = Router()

api.post('/add',[validateJwt,isClient,limiter],confirmPurchase)
api.get('/get',[validateJwt,isClient,limiter],purchaseHitory)
export default api
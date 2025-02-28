'use strict'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet' 
import cors from 'cors'
import adminRouthes from '../src/admin/admin.routes.js'
import authRouthes from '../src/auth/auth.routes.js'
import clientRouthes from '../src/client/client.routes.js'
import categoryRouthes from '../src/category/category.routes.js'
import productRouthes from '../src/products/product.routes.js'
const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

 const routes = (app)=>{
    app.use('/v1/admin',adminRouthes)
    app.use('/v1',authRouthes)
    app.use('/v1/client',clientRouthes)
    app.use('/v1/category',categoryRouthes)
    app.use('/v1/product',productRouthes)
}
export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}
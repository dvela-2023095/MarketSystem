'use strict'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet' 
import cors from 'cors'
import adminRouthes from '../src/admin/admin.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import clientRoutes from '../src/client/client.routes.js'
const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

 const routes = (app)=>{
    app.use('/v1/admin',adminRouthes)
    app.use('/v1',authRoutes)
    app.use('/v1/client',clientRoutes)
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
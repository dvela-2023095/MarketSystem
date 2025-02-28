import { initServer } from './configs/app.js'
import { config } from 'dotenv'
import { connect } from './configs/mongo.js'
import {alreadyExist} from './utils/default.objects.js'
config()
connect()
alreadyExist()
initServer()

import express from 'express'
import {signup,signin} from '../controllers/auth.controller.js'

export const authRouter = express.Router()

//SIGNUP ROUTES
authRouter.post('/signup',signup)

//SIGNUP ROUTES
authRouter.post('/signin',signin)

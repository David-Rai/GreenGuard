import express from 'express'
import db from '../model/db_local.js'
import jwt from 'jsonwebtoken'

export const reportRouter = express.Router()

//For getting all the reports data
reportRouter.get('/report', async (req, res) => {

    //fetching from the database
    const q = "select * from reports"
    const [result] = await db.execute(q)

    res.json(result)


})

//For getting specific user reports
reportRouter.get('/reports', async (req, res) => {
    console.log("on reporting route")
    const { token } = req.cookies
    console.log(token)
    const decoded = jwt.verify(token, process.env.SECRET)
    const { username } = decoded
    console.log(decoded)

    console.log("getting reports", username)
    //Getting from the database
    const q = 'select * from reports where user_id = ?'
    const [results] = await db.execute(q, [username])

    console.log(results)

    res.json(results)
})
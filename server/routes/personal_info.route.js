import express from 'express'
import db from '../model/db_local.js'

export const personalRouter = express.Router()


//Getting the user info
personalRouter.get('/profile/:username', async (req, res) => {
    const { username } = req.params

    //Fetching from the database
    const q = "select username,email from users where username=?"
    const [result] = await db.execute(q, [username])

    if (result.length === 0) {
        return res.status(401).json({ message: "no user exist" })
    }

    res.json({ username, result })
})


//Getting all the user Reports
personalRouter.get('/profile/reports', async (req, res) => {
    const { username } = req.body

    //Getting from the database
    const q = 'select * from reports where user_id = ?'
    const results = await db.execute(q, [username])

    res.json(results)
})
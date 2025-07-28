import express from 'express'

export const personalRouter = express.Router()


//Getting the user info
personalRouter.get('/profile/:username', (req, res) => {
    const { username } = req.params

    //Fetching from the database
    

    res.json(username)
})

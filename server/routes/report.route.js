import express from 'express'
import db from '../model/db_local.js'

export const reportRouter=express.Router()

//For getting all the reports data
reportRouter.get('/report',async (req,res)=>{

    //fetching from the database
    const q="select * from reports"
    const [result]=await db.execute(q)

    res.json(result)

    
})
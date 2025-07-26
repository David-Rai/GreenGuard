import { Socket } from 'dgram'
import db from '../model/db_local.js'

//Handling the socket connections
export const handleSocket = (io) => {
    io.on("connection", client => {
        console.log(client.id)

        //Getting all the reports
        client.on('get-reports', async () => {
            console.log("getting the reports......")

            const q = 'select * from reports'
            const [rows] = await db.execute(q)

            // console.log(rows)
            //sending the the client or user
            client.emit('all-reports',rows)
        })

        //Getting the new report
        client.on("new-report", async (data) => {
            console.log(data)
            const { contact_number, purpose, description ,lat,lng} = data

            //storing the data into the database
            const q = 'insert into reports (purpose,contact_number,description,lat,lng) values (?,?,?,?,?)'
            const [results] = await db.execute(q, [purpose, contact_number, description,lat,lng])

            console.log(results)

            //reply for sucessfull storing data
            if (results.affectedRows) {
                console.log("successfully saved report")
                client.emit("added-report")
            }

        })
    })

}
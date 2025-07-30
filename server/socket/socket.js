
import cookie from 'cookie';
import { Socket } from 'dgram'
import db from '../model/db_local.js'

//Handling the socket connections
export const handleSocket = (io) => {
    io.on("connection", client => {

        //Getting the client token
        const cookieString = client.handshake.headers.cookie || null;
        const cookies = cookie.parse(cookieString);

        const { token } = cookies
console.log(token)

        console.log(client.id)

        //Getting all the reports
        client.on('get-reports', async () => {
            console.log("getting the reports......")

            const q = 'select * from reports'
            const [rows] = await db.execute(q)

            //sending the the client or user
            client.emit('all-reports', rows)
        })

        //Saving the new report
        client.on("new-report", async (data) => {
            console.log(data)
            const { contact_number, purpose, description, lat, lng } = data

            //storing the data into the database
            const q = 'insert into reports (purpose,contact_number,description,lat,lng) values (?,?,?,?,?)'
            const [results] = await db.execute(q, [purpose, contact_number, description, lat, lng])

            console.log(results)

            //reply for sucessfull storing data
            if (results.affectedRows) {
                console.log("successfully saved report")
                client.emit("added-report")
            }

        })
    })

}
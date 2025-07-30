import jwt from 'jsonwebtoken'
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
        //Getting the decoded jwt
        const Secret_Key = process.env.SECRET
        const decoded = jwt.verify(token, Secret_Key)


        console.log(client.id)

        //Saved_report of users
        client.on('save-report', async ({ report_id }) => {
            // console.log(decoded)
            const { user_id } = decoded

            //Storing on database
            const q = 'insert into saved_reports (user_id,report_id) values (?,?)'
            const [result] = await db.execute(q, [user_id, report_id])

            console.log(result)

            client.emit("saved-report")
        })

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
            console.log("new report", data)

            try {
                const { username } = decoded

                const { contact_number, purpose, description, lat, lng } = data

                //storing the data into the database
                const q = 'insert into reports (purpose,contact_number,description,lat,lng,user_id) values (?,?,?,?,?,?)'
                const [results] = await db.execute(q, [purpose, contact_number, description, lat, lng, username])

                //reply for sucessfull storing data
                if (results.affectedRows) {
                    console.log("successfully saved report")
                    client.emit("added-report")
                }

            }
            catch (err) {
                console.log(err)
            }
        })
    })

}
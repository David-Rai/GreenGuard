import jwt from 'jsonwebtoken'
import cookie from 'cookie';
import db from '../model/db_local.js'


//Handling the socket connections
export const handleSocket = (io) => {
    io.on("connection", client => {

        // //Getting the client token
        // const cookieString = client.handshake.headers.cookie || ' ';
        // const cookies = cookie.parse(cookieString);
        // const { token } = cookies
        // //Getting the decoded jwt
        // const Secret_Key = process.env.SECRET
        // const decoded = jwt.verify(token, Secret_Key)


        console.log(client.id)

        //Saved_report of users
        client.on('save-report', async ({ report_id }) => {
            try {
                const cookieString = client.handshake.headers.cookie;

                if (!cookieString) {
                    console.log('No cookie sent');
                    return; // Or disconnect client, etc.
                }

                const cookies = cookie.parse(cookieString);
                const token = cookies.token;

                if (!token) {
                    console.log('No token found in cookies');
                    return; // Or disconnect client
                }

                try {
                    const Secret_Key = process.env.SECRET;
                    const decoded = jwt.verify(token, Secret_Key);

                    const { user_id } = decoded;

                    const q = 'INSERT INTO saved_reports (user_id, report_id) VALUES (?, ?)';
                    const [result] = await db.execute(q, [user_id, report_id]);

                    console.log(result);
                    client.emit("saved-report");
                    // Proceed with decoded token
                } catch (error) {
                    console.log('JWT verification failed:', error.message);
                    return; // Or disconnect client
                }
            } catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    // Duplicate entry error, handle it gracefully
                    console.log('Report already saved by this user');
                    client.emit('error', { message: 'You have already saved this report.' });
                } else {
                    // Other unexpected errors
                    console.error('Database error:', error);
                    client.emit('error', { message: 'An unexpected error occurred.' });
                }
            }
        });


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
            const cookieString = client.handshake.headers.cookie;
            if (!cookieString) {
                console.log('No cookie sent');
                return; // Or disconnect client, etc.
            }
            const cookies = cookie.parse(cookieString);
            const token = cookies.token;
            if (!token) {
                console.log('No token found in cookies');
                return; // Or disconnect client
            }
            try {
                const Secret_Key = process.env.SECRET;
                const decoded = jwt.verify(token, Secret_Key);

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

                // Proceed with decoded token
            } catch (error) {
                console.log('JWT verification failed:', error.message);
                return; // Or disconnect client
            }
        })
    })

}
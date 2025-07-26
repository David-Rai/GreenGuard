
//Handling the socket connections
export const handleSocket = (io) => {
    io.on("connection", client => {
        console.log(client.id)

        
    })

}
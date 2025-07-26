import express from 'express'
import { handleSocket } from './socket/socket.js';
import { errorhandling } from './middlewares/errorhandling.js'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.route.js';
import { configDotenv } from 'dotenv';
import http from 'http'

configDotenv()//Env configuration

//App instance
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})
const PORT = process.env.PORT

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//Socket connection handling
handleSocket(io)

//Routes implemented
app.use(authRouter)

//Routes handling
app.get('/', (req, res) => {
    res.json('Hello World');
});

//error handling
app.use(errorhandling)

//Listening the connection
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
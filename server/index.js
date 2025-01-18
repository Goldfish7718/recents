// MODULE IMPORTS
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import { Server } from 'socket.io'
import http from 'http'
import cron from 'node-cron'
import User from './models/userModel.js';

config()

// ROUTE IMPORTS
import userRoutes from './routes/userRoutes.js'
import newsRoutes from './routes/newsRoutes.js'
import statRoutes from './routes/statRoutes.js'

// SOCKET FUNCTION IMPORTS
import { getLimelightResponse } from './controllers/socketControllers.js'


const app = express()
const PORT = 5000
const server = http.createServer(app)

if (process.env.ORIGIN) {
    app.use(cors({
        credentials: true,
        origin: process.env.ORIGIN
    }))
} else {
    app.use(cors())
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTES MIDDLEWARE
app.use('/user', userRoutes)
app.use('/news', newsRoutes)
app.use('/stats', statRoutes)

app.get('/', (req, res) => {
    res.send("Recents Server")
})

const io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log(`User Logged: ${socket.id}`);

    socket.on('get_response', async data => {
        const res = await getLimelightResponse(data.prompt, data.clerkId, socket)
        socket.emit('receive', res)
    })
})

cron.schedule('0 0 0 * * *', async () => {
    try {
      await User.updateMany({}, { $set: { limelightRequests: 0, dailySummariesRequests: 0 } });
      console.log('All users\' requests have been reset to 0');
    } catch (error) {
      console.error('Error resetting user requests:', error);
    }
}, {timezone:'Asia/Calcutta'});



const connectDB = async (url) => {
    await mongoose
        .connect(url)
        .then(() => console.log("Database Connected"))
        .catch(err => console.log(err))
}

server.listen(PORT, async () => {
    await connectDB(process.env.DB_URI || 'mongodb://0.0.0.0:27017/recents-DB')
    console.log(`Server started on port ${PORT}`);    
})

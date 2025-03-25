const express = require('express');
const { createServer } = require('node:http');
const crypto = require('node:crypto');
var cors = require('cors')
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const RoomSchema = require('./models/rooms');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
var corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: 10 * 60 * 1000,
        skipMiddlewares: true,
    },
    transports: ["websocket"]
});

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.clear()
    console.error('MongoDB connection error:', err.message);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/api/room/create', (req, res) => {
    const { username } = req.body
    const roomId = crypto.randomBytes(3).toString('hex').toUpperCase()
    const room = RoomSchema({ roomId, users: [username], messages: [] });
    room.save().then(() => {
        res.json({ roomId, username })
    }).catch((err) => {
        console.log(err)
    })
});

app.post('/api/room/join', (req, res) => {
    const { username, roomId } = req.body

    const room = RoomSchema.findOne({ roomId })
    .then((room) => {        
        if(!room.users) {
            room.users = [username]
        } else {
            room.users.push(username)
        }
        room.save().then(() => {
            res.json({ roomId, username })
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
});

app.get('/api/room/:roomId', (req, res) => {
    const { roomId } = req.params
    RoomSchema.findOne({ roomId }).then((room) => {
        res.json(room)
    }).catch((err) => {
        console.log(err)
    })
})

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', ({ roomId, username }) => {
        socket.join(roomId);
        console.log('join-room', socket.rooms)
        socket.to(roomId).emit('user-joined', { username });
    })

    socket.on('send-message', async ({ roomId, username, message }) => {
        const timestamp = Date.now();

        if (!socket.rooms.has(roomId)) {
            socket.join(roomId);
        }
        await RoomSchema.updateOne({ roomId }, { $push: { messages: { username, message, timestamp } } });
        io.to(roomId).emit('receive-message', { username, message, timestamp });
        // socket.broadcast.emit('receive-message', { message, timestamp });
    })

    socket.on('disconnect', () => {
        // for (const roomID in rooms) {
        //     rooms[roomID] = rooms[roomID].filter((user) => user.id !== socket.id);
        //     if (rooms[roomID].length === 0) {
        //         delete rooms[roomID]; // Remove empty room
        //     }
        // }
        console.log('User disconnected:', socket.id);
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

server.listen(3000, () => {
    console.clear()
    console.log('server running at http://localhost:3000');
});
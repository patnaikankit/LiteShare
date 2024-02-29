require('dotenv').config()
const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
const { Socket } = require('dgram')

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true
    })
);

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});


// records is used to keep track of the socketid with the room no.
// when a new user join a room his socketid is associated with that particular room's id
var records = new Map();
// the following maps are used for bidirectional mappings between users and their unique identifiers 
// they are essential during establishing the initial connection using the signalling server
const userToUniqueID = new Map(), uniqueIDtoUser = new Map();

io.on('connection', (socket) => {
    // to join the socketID of the new user with room number
    socket.on("joinRoom", (val) => {
        socket.join(Number(val))
        records.set(socket.id, Number(val))
        socket.emit("ack", `You have joined room ${val}`)
    })

    // to broadcast the message to the peer
    socket.on('message', (val) => {
        const roomNum = records.get(socket.id)
        io.to(roomNum).emit("roomMsg", val)
    })
})


httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening on port ${process.env.PORT ? process.env.PORT : 4000}`);
})
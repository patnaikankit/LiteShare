// Signalling server implementation using socket.io
require('dotenv').config()
const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

const app = express();

app.use(
    cors({
        origin: ["https://lite-share.vercel.app/", " http://localhost:3000", "http://localhost:3001"],
        credentials: true
    })
);

app.get("/", (req, res) => {
    res.send("Server Responding!")
})

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
// when a new user uses the application for the first time a uniqueID is generated for him corresponding to its socketId
// User will share this uniqueId to the peer for establishing a new connection
const userToUniqueID = new Map(), uniqueIDtoUser = new Map();

io.on('connection', (socket) => {
    // to join the socketID of the new user with room number
    socket.on('joinRoom', (val) => {
        socket.join(Number(val))
        records.set(socket.id, Number(val))
        socket.emit("ack", `You have joined room ${val}`)
    })

    // to broadcast the message to the peer
    socket.on('message', (val) => {
        const roomNum = records.get(socket.id)
        io.to(roomNum).emit("roomMsg", val)
    })

    // the server establishes mappings to associate the user's socket ID with their unique ID and logs the updated mappings for tracking
    socket.on('details', (data) => {
        var user = data.socketId
        var uniqueId = data.uniqueId

        userToUniqueID.set(user, uniqueId)
        uniqueIDtoUser.set(uniqueId, user)
        console.log("New User Added!");
        for(let [key, value] of userToUniqueID){
            console.log(key + " = " + value);
        }
    })

    // The signalling server logic is implemeneted in this 'send-signal' event
    // The user will make an offer to the peer using his uniqueId as sender and his uniqueId as the destination
    socket.on('send-signal', (val) => {
        const user = val.to
        const socketPeer = uniqueIDtoUser.get(user)
        io.to(socketPeer).emit("signalling", {
            from: val.from,
            signalData: val.signalData,
            to: val.to
        })
    })

    // If the peer accepts the offer, he signal's acceptance data to the identified partner's socket
    socket.on('accept-signal', (val) => {
        var user = val.to
        const socketPeer = uniqueIDtoUser.get(user)
        io.to(socketPeer).emit("offerAccepted", {
            signalData: val.signalData,
            to: val.to
        })
    })


    // To terminate the connection or due to some issue it gets terminated
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
        // to remove the disconnected socket id from the map
        const user = socket.id
        const uniqueID = userToUniqueID.get(user)

        userToUniqueID.delete(user)
        uniqueIDtoUser.delete(uniqueID)

        // Log the updated map
        console.log("Updated userToUniqueID");
        for(let [key, value] of userToUniqueID){
            console.log(key + " = " + value);
        }

        console.log("Updated uniqueIDtoUser");
        for(let [key, value] of uniqueIDtoUser){
            console.log(key + " = " + value);
        }
    })
})


httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening on port ${process.env.PORT ? process.env.PORT : 4000}`);
})

import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import gameRoutes from "./routes/game.routes.js";
import fillBlanckRoutes from "./routes/fillBlanck.routes.js";

const app = express();
dotenv.config();

// Middleware for handling CORS POLICY
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/fillBlanck", fillBlanckRoutes);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173","http://localhost:5173/home/fillBlanckGame/66f2e30110c759b93f6e59f3"], // Replace with your frontend URL if needed
        methods: ["GET", "POST"]
    }
});

// Track connected players
// let connectedPlayers = 0;

let connectedUsers = [];

io.on('connection', (socket) => {
    // Assume userAuth object is obtained from the authenticated socket
    const userAuth = {
        id: socket.id,
        username: socket.handshake.query.username || 'Anonymous',
        // Add other user-related properties as needed
    };
    
    connectedUsers.push(userAuth);
    io.emit('userAuthList', connectedUsers);
    // console.log('A user connected:', userAuth.username, 'Total users:', connectedUsers.length);

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter(user => user.id !== socket.id);
        io.emit('userAuthList', connectedUsers);
        // console.log('A user disconnected:', userAuth.username, 'Total users:', connectedUsers.length);
    });
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
